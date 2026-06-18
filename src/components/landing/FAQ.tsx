import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "How secure is my data?",
    a: "Your data is encrypted at rest and in transit. Jeevana follows industry-standard security practices, and your conversations are never used to train third-party models.",
  },
  {
    q: "Can Jeevana track expenses automatically?",
    a: "Yes. Just mention an expense in chat — 'Beli kopi 25 ribu' — and Jeevana extracts the amount, category, and timestamp into your finance dashboard.",
  },
  {
    q: "Can I use Jeevana as a daily journal?",
    a: "Absolutely. Anything you tell Jeevana becomes part of your life log. You can search, reflect, and review past days anytime.",
  },
  {
    q: "Does Jeevana support reminders?",
    a: "Yes. Natural-language reminders like 'Ingatkan saya bayar listrik tanggal 10' are scheduled automatically and pushed when due.",
  },
  {
    q: "Will there be a mobile app?",
    a: "A native mobile app is on the roadmap for Phase 4. For now, Jeevana works beautifully as a responsive web app on every device.",
  },
  {
    q: "Can Jeevana understand Indonesian?",
    a: "Yes — Jeevana is bilingual by design. Bahasa Indonesia and English work equally well. Mix them in the same sentence if you want.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-surface px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Frequently asked.
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-2xl border border-black/5 bg-canvas px-5"
            >
              <AccordionTrigger className="text-left text-base font-bold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-ink/60">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
