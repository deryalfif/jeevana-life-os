import { ArrowRight, Sparkles } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-ink via-[#1e1b4b] to-[#3B0764] p-12 md:p-20">
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(50% 50% at 80% 20%, rgba(139,92,246,0.6), transparent), radial-gradient(40% 40% at 20% 80%, rgba(59,130,246,0.5), transparent)",
            }}
          />
          <div className="relative grid items-center gap-12 md:grid-cols-5">
            <div className="md:col-span-3">
              <h2 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                Start Understanding <br />
                Your Life Better.
              </h2>
              <p className="mt-6 max-w-xl text-pretty text-lg text-white/70">
                Stop switching between apps. Let Jeevana organize your life through simple
                conversations.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-bold text-ink shadow-xl transition-transform hover:scale-105"
                >
                  Start Free Today <ArrowRight className="size-4" />
                </a>
                <span className="text-sm text-white/50">No credit card · Free forever</span>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="relative mx-auto aspect-square w-full max-w-sm">
                <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-brand/40 to-grape/40 blur-3xl" />
                <div className="absolute inset-6 rounded-full bg-gradient-to-br from-brand to-grape shadow-2xl">
                  <div className="absolute inset-3 rounded-full border border-white/20 backdrop-blur-xl" />
                  <div className="absolute inset-0 grid place-items-center">
                    <Sparkles className="size-24 text-white" strokeWidth={1.2} />
                  </div>
                </div>
                {/* orbiting badges */}
                <div className="absolute -right-2 top-8 rounded-2xl bg-white/95 px-3 py-2 text-xs font-bold shadow-xl backdrop-blur">
                  ✓ Logged
                </div>
                <div className="absolute -left-2 bottom-12 rounded-2xl bg-white/95 px-3 py-2 text-xs font-bold shadow-xl backdrop-blur">
                  ✓ Organized
                </div>
                <div className="absolute -bottom-2 right-12 rounded-2xl bg-white/95 px-3 py-2 text-xs font-bold shadow-xl backdrop-blur">
                  ✓ Insightful
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
