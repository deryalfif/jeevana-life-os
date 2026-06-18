## Direction
Going with the Swiss-GenZ Bento direction — light `#F8FAFC` canvas, bold Inter display type, gradient (blue→purple) accents, rounded-3xl bento tiles, glass nav, dark inverted "value props" island.

## Sections (single-page, in order)
1. Sticky blur navbar — Jeevana wordmark · Features / Use Cases / Roadmap / Pricing / FAQ · Start Free
2. Hero — gradient headline "Your Entire Life, Organized In One Conversation.", subheadline, Start Free + Watch Demo. Split visual: chat panel (Indonesian input → ✓ Activity Logged / Distance / Duration) + dashboard mockup with 4 floating badges (Activity Saved, Expense Recorded, Reminder Created, Daily Summary Ready)
3. Stats strip — 10,000+ · 95% · 30+ · 4.9/5
4. Problem bento — "Your Life Is Scattered Across Too Many Apps." 5 disconnected tiles: Notes, Finance, Calendar, Tasks, Health
5. Value props bento (dark island) — "One Conversation. One Organized Life." × 4: Natural Language First, Automatic Structuring, Life Data Hub, Smart Insights
6. Features — 5 cards each showing Indonesian input → structured output chips (Daily Logging, Expense, Income, Reminder, Daily Summary)
7. How it works — vertical timeline, 5 steps
8. Dashboard preview — 3 tabs (Home / Finance / Activity) inside a browser-frame card with realistic charts, activity log, reminders, AI insights
9. Built For — 6 persona tiles (Young Professionals, Students, Freelancers, Creators, Entrepreneurs, Remote Workers)
10. Benefits — 6-item checklist ("What You Gain With Jeevana")
11. Roadmap — 4 phases (MVP / Social Finance / Health / Integrations)
12. Pricing — 3 tiers, PRO (Rp 10k/mo) highlighted dark with ring; Free + Premium (Rp 20k/mo) on white
13. FAQ — 6 accordion items
14. Final CTA — gradient card "Start Understanding Your Life Better." with AI assistant visual
15. Footer — Jeevana · "Your Life. Organized." · menu · socials · © 2026

## Technical
- TanStack Start: single route at `src/routes/index.tsx` replacing placeholder. Sub-components in `src/components/landing/` (Nav, Hero, Stats, Problem, ValueProps, Features, HowItWorks, DashboardPreview, BuiltFor, Benefits, Roadmap, Pricing, FAQ, FinalCTA, Footer).
- Design tokens in `src/styles.css` (@theme): `--color-primary #0F172A`, `--color-secondary #3B82F6`, `--color-accent #8B5CF6`, `--color-background #F8FAFC`, `--color-surface #FFFFFF`. Inter via Google Fonts `<link>` in `src/routes/__root.tsx` head.
- SEO in `head()`: title, meta description, OG tags. Single H1 (hero).
- Animation: framer-motion (already pulled if present, else add) for scroll-reveal fades + hover lift; subtle pulse on status dots. Keep restrained.
- Dashboard + chat visuals built with pure HTML/Tailwind (no image placeholders) so it looks like the live product. AI assistant visual in final CTA is a generated PNG.
- Accordion via shadcn `accordion` component for FAQ.
- Fully responsive: bento collapses to single column on mobile; nav links hide < md.

## Out of scope
No auth, no backend, no real data — pure marketing page.
