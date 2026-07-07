import { describe, it, expect } from "vitest";
import { retrieveRelevantMemories, formatMemoryContextForPrompt } from "./retrieve";

// Tipe minimal untuk test (tanpa is_pinned, is_archived, tags, updated_at)
type MemoryStub = {
  id: string;
  content: string;
  created_at: string;
};

const now = new Date().toISOString();
const older = new Date(Date.now() - 86400_000).toISOString();

const memories: MemoryStub[] = [
  { id: "1", content: "User suka makan siang di warung padang dekat kantor", created_at: older },
  {
    id: "2",
    content: "Gaji bulanan user sekitar 8 juta, pemasukan freelance tambahan",
    created_at: now,
  },
  { id: "3", content: "User jogging setiap pagi jam 6 di taman belakang rumah", created_at: older },
  { id: "4", content: "User punya cicilan motor 500 ribu per bulan", created_at: older },
  { id: "5", content: "User senang baca buku fiksi ilmiah sebelum tidur", created_at: now },
  { id: "6", content: "Target olahraga user: lari 5km, 3 kali seminggu", created_at: older },
];

describe("retrieveRelevantMemories", () => {
  it("query keuangan → dapat memory finance (bukan olahraga)", () => {
    const results = retrieveRelevantMemories(memories, "berapa pengeluaran bulanan saya?");
    const ids = results.map((r) => r.id);
    // Harus dapat memory keuangan (id 2 atau 4)
    expect(ids.some((id) => id === "2" || id === "4")).toBe(true);
    // Tidak boleh memory olahraga menjadi yang pertama
    expect(ids[0]).not.toBe("3");
    expect(ids[0]).not.toBe("6");
  });

  it("query olahraga → dapat memory olahraga", () => {
    const results = retrieveRelevantMemories(memories, "jadwal olahraga saya apa?");
    const ids = results.map((r) => r.id);
    // Harus dapat memory olahraga (id 3 atau 6)
    expect(ids.some((id) => id === "3" || id === "6")).toBe(true);
  });

  it("empty memories → return empty array", () => {
    const results = retrieveRelevantMemories([], "apa saja pengeluaran saya?");
    expect(results).toHaveLength(0);
  });

  it("empty query → return empty array", () => {
    const results = retrieveRelevantMemories(memories, "");
    expect(results).toHaveLength(0);
  });

  it("whitespace-only query → return empty array", () => {
    const results = retrieveRelevantMemories(memories, "   ");
    expect(results).toHaveLength(0);
  });

  it("query tidak relevan → return empty (score 0)", () => {
    const results = retrieveRelevantMemories(memories, "xxxxxxx yyyyyyy zzzzzzz");
    expect(results).toHaveLength(0);
  });

  it("limit berfungsi → tidak return lebih dari limit", () => {
    const results = retrieveRelevantMemories(memories, "user makan olahraga lari gaji", 2);
    expect(results.length).toBeLessThanOrEqual(2);
  });

  it("default limit = 5 → tidak return lebih dari 5", () => {
    const manyMemories = Array.from({ length: 20 }, (_, i) => ({
      id: String(i),
      content: `Memory tentang olahraga lari jogging setiap pagi nomor ${i}`,
      created_at: now,
    }));
    const results = retrieveRelevantMemories(manyMemories, "olahraga lari pagi");
    expect(results.length).toBeLessThanOrEqual(5);
  });

  it("hasil memiliki score > 0", () => {
    const results = retrieveRelevantMemories(memories, "gaji income freelance");
    results.forEach((r) => expect(r.score).toBeGreaterThan(0));
  });

  it("hasil diurutkan score descending", () => {
    const results = retrieveRelevantMemories(memories, "olahraga jogging lari user");
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
    }
  });
});

describe("formatMemoryContextForPrompt", () => {
  it("empty → return empty string", () => {
    expect(formatMemoryContextForPrompt([])).toBe("");
  });

  it("format numbered list dengan benar", () => {
    const mems = [
      { id: "a", content: "Suka kopi", score: 1, matchedTerms: ["kopi"], created_at: now },
      { id: "b", content: "Punya kucing", score: 0.5, matchedTerms: ["kucing"], created_at: now },
    ];
    const result = formatMemoryContextForPrompt(mems);
    expect(result).toContain("1. Suka kopi");
    expect(result).toContain("2. Punya kucing");
  });
});
