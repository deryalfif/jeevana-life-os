/**
 * Semantic Memory Retrieval
 *
 * Diadaptasi dari jeevana_trae/src/lib/memory/retrieve.ts
 * Menggunakan TF-IDF + alias Bahasa Indonesia + semantic expansion
 * untuk menemukan memories yang paling relevan dengan input user.
 */

// ─── Token Aliases (Bahasa Indonesia → konsep) ───────────────────────────────
const tokenAliases: Record<string, string> = {
  bayar: "pay",
  bayarin: "pay",
  dibayar: "pay",
  pembayaran: "pay",
  tagihan: "bill",
  invoice: "bill",
  cicilan: "installment",
  utang: "debt",
  hutang: "debt",
  listrik: "electricity",
  pln: "electricity",
  lampu: "electricity",
  reminder: "reminder",
  ingatkan: "reminder",
  pengingat: "reminder",
  jadwalkan: "reminder",
  besok: "tomorrow",
  lusa: "future",
  pagi: "morning",
  siang: "afternoon",
  sore: "evening",
  malam: "night",
  harian: "daily",
  mingguan: "weekly",
  bulanan: "monthly",
  tiap: "recurring",
  setiap: "recurring",
  rutin: "recurring",
  gaji: "salary",
  gajian: "salary",
  bonus: "income",
  salary: "salary",
  pemasukan: "income",
  income: "income",
  pengeluaran: "expense",
  expense: "expense",
  freelance: "freelance",
  proyek: "freelance",
  project: "freelance",
  transport: "transport",
  bensin: "transport",
  ojek: "transport",
  makan: "food",
  makanan: "food",
  kopi: "food",
  ngopi: "food",
  jajan: "food",
  olahraga: "exercise",
  jogging: "exercise",
  lari: "exercise",
  gym: "exercise",
  renang: "exercise",
  bersepeda: "exercise",
  meeting: "meeting",
  rapat: "meeting",
  standup: "meeting",
  kerja: "work",
  bekerja: "work",
  belajar: "study",
  membaca: "study",
  baca: "study",
  tidur: "sleep",
  istirahat: "rest",
};

// ─── Semantic Expansions (konsep → konsep terkait) ───────────────────────────
const semanticExpansions: Record<string, string[]> = {
  salary: ["income", "finance"],
  income: ["salary", "finance"],
  expense: ["finance", "pay"],
  finance: ["income", "expense"],
  pay: ["bill", "expense"],
  bill: ["pay", "expense"],
  electricity: ["bill", "expense"],
  reminder: ["schedule"],
  exercise: ["activity", "health"],
  meeting: ["activity", "work"],
  work: ["activity"],
  study: ["activity"],
  food: ["expense"],
  transport: ["expense"],
  freelance: ["income", "work"],
};

// ─── Stopwords Indonesia ──────────────────────────────────────────────────────
const stopwords = new Set([
  "aku",
  "saya",
  "tolong",
  "mohon",
  "please",
  "yang",
  "dan",
  "untuk",
  "dengan",
  "pada",
  "ini",
  "itu",
  "ada",
  "biasa",
  "biasanya",
  "gimana",
  "bagaimana",
  "berapa",
  "kapan",
  "kenapa",
  "mengapa",
  "siapa",
  "apa",
  "apakah",
  "dong",
  "deh",
  "sih",
  "yuk",
  "yah",
  "ya",
  "oke",
  "ok",
]);

// ─── Types ────────────────────────────────────────────────────────────────────

export type MemoryRow = {
  id: string;
  content: string;
  created_at: string;
};

export type ScoredMemory = {
  id: string;
  content: string;
  score: number;
  matchedTerms: string[];
  created_at: string;
};

// ─── Tokenizer ────────────────────────────────────────────────────────────────

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !stopwords.has(t))
    .map((t) => tokenAliases[t] ?? t);
}

function expandTokens(tokens: string[]): string[] {
  const expanded = new Set(tokens);
  for (const token of tokens) {
    const expansions = semanticExpansions[token];
    if (expansions) {
      for (const e of expansions) expanded.add(e);
    }
  }
  return Array.from(expanded);
}

// ─── TF-IDF Helpers ───────────────────────────────────────────────────────────

function buildIdfMap(memories: MemoryRow[]): Map<string, number> {
  const docFreq = new Map<string, number>();
  const N = memories.length || 1;

  for (const memory of memories) {
    const uniqueTokens = new Set(tokenize(memory.content));
    for (const t of uniqueTokens) {
      docFreq.set(t, (docFreq.get(t) ?? 0) + 1);
    }
  }

  const idf = new Map<string, number>();
  for (const [term, df] of docFreq) {
    idf.set(term, Math.log((N + 1) / (df + 1)) + 1);
  }
  return idf;
}

function scoreTfIdf(
  memoryTokens: string[],
  queryTokens: string[],
  idfMap: Map<string, number>,
): { score: number; matched: string[] } {
  const tf = new Map<string, number>();
  for (const t of memoryTokens) {
    tf.set(t, (tf.get(t) ?? 0) + 1);
  }

  let score = 0;
  const matched: string[] = [];

  for (const qt of queryTokens) {
    const termFreq = tf.get(qt) ?? 0;
    if (termFreq > 0) {
      const idf = idfMap.get(qt) ?? 1;
      score += (termFreq / memoryTokens.length) * idf;
      matched.push(qt);
    }
  }

  return { score, matched };
}

// ─── Main Retrieval Function ──────────────────────────────────────────────────

/**
 * Mengambil memories yang paling relevan dengan input user.
 *
 * @param memories - Semua memories user dari database
 * @param userInput - Pesan terbaru dari user
 * @param limit - Jumlah maksimal memories yang dikembalikan (default: 5)
 * @returns Array memories yang sudah di-rank berdasarkan relevansi
 */
export function retrieveRelevantMemories(
  memories: MemoryRow[],
  userInput: string,
  limit = 5,
): ScoredMemory[] {
  if (!userInput.trim() || memories.length === 0) return [];

  const rawQueryTokens = tokenize(userInput);
  const queryTokens = expandTokens(rawQueryTokens);
  const idfMap = buildIdfMap(memories);

  return memories
    .map((memory) => {
      const memoryTokens = tokenize(memory.content);
      const { score, matched } = scoreTfIdf(memoryTokens, queryTokens, idfMap);
      return {
        id: memory.id,
        content: memory.content,
        created_at: memory.created_at,
        score,
        matchedTerms: matched,
      };
    })
    .filter((m) => m.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, limit);
}

/**
 * Format memories yang sudah di-rank untuk dimasukkan ke system prompt AI.
 */
export function formatMemoryContextForPrompt(memories: ScoredMemory[]): string {
  if (memories.length === 0) return "";

  return memories
    .map((m, i) => `${i + 1}. ${m.content}`)
    .join("\n");
}
