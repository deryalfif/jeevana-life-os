import { Activity, Brain, type LucideIcon, MessageCircle, Zap } from "lucide-react";

export function ValueProps() {
  return (
    <section className="mx-4 rounded-[2.5rem] bg-ink px-6 py-24 text-white md:mx-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/60">
            The Jeevana Way
          </div>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-6xl">
            One Conversation.
            <br />
            <span className="bg-gradient-to-r from-brand to-grape bg-clip-text text-transparent">
              One Organized Life.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[200px]">
          <ValueTile
            className="md:col-span-3 md:row-span-2 bg-gradient-to-br from-brand to-grape"
            icon={MessageCircle}
            title="Natural Language First"
            desc="Tidak perlu form. Tidak perlu kategori. Just talk to Jeevana like you'd text a friend — in Indonesian or English."
            big
          />
          <ValueTile
            className="md:col-span-3 bg-white/5 border border-white/10"
            icon={Zap}
            title="Automatic Structuring"
            desc="AI mengubah percakapan menjadi data terstruktur — categorized, timestamped, ready to analyze."
          />
          <ValueTile
            className="md:col-span-2 bg-white/5 border border-white/10"
            icon={Activity}
            title="Life Data Hub"
            desc="Semua aspek kehidupan tersimpan dalam satu tempat."
          />
          <ValueTile
            className="md:col-span-1 bg-white text-ink"
            icon={Brain}
            title="Smart Insights"
            desc="Memahami pola hidupmu."
            invert
          />
        </div>
      </div>
    </section>
  );
}

function ValueTile({
  className = "",
  icon: Icon,
  title,
  desc,
  big = false,
  invert = false,
}: {
  className?: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  big?: boolean;
  invert?: boolean;
}) {
  return (
    <div className={`flex flex-col justify-between rounded-3xl p-6 md:p-8 ${className}`}>
      <div
        className={`grid size-10 place-items-center rounded-xl ${
          invert ? "bg-ink/5 text-ink" : "bg-white/10 text-white"
        }`}
      >
        <Icon className="size-5" />
      </div>
      <div className="mt-8">
        <h3 className={`font-bold ${big ? "text-2xl md:text-3xl" : "text-lg"}`}>{title}</h3>
        <p className={`mt-2 text-sm leading-relaxed ${invert ? "text-ink/60" : "text-white/70"}`}>
          {desc}
        </p>
      </div>
    </div>
  );
}
