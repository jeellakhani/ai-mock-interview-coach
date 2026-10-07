import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, ArrowRight, TrendingUp } from "lucide-react";
import { CTA, Logo, pageMeta } from "@/components/aimc";

export const Route = createFileRoute("/")({
  head: () => pageMeta("AIMC — Practice the interview before the interview", "Practice realistic technical and HR interviews. Get feedback on what you said, how you said it, and what to improve next."),
  component: Landing,
});

function HeroTranscript() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const ts = [600, 1500, 2200, 2900, 3700].map((d, i) => setTimeout(() => setStep(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, []);
  return (
    <div className="rounded-2xl bg-ink p-6 text-ink-foreground sm:p-8">
      <div className="flex items-center justify-between border-b border-ink-line pb-4">
        <span className="eyebrow text-ink-muted">Interview / Software Engineer</span>
        <span className="eyebrow text-ink-muted">Question 03</span>
      </div>
      <p className="mt-6 text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
        “Tell me about a technical problem you solved under pressure.”
      </p>
      <div className={`mt-6 border-l-2 border-ink-line pl-4 text-sm leading-relaxed text-ink-muted transition-opacity duration-700 ${step >= 1 ? "opacity-100" : "opacity-0"}`}>
        During our campus sale the checkout API began timing out. I traced it to an unindexed query, added a compound index and caching, and load-tested the fix before the next peak…
      </div>
      <ul className="mt-6 space-y-2 text-sm">
        {[
          ["Good structure", true],
          ["Strong example", true],
          ["Needs more measurable impact", false],
        ].map(([t, ok], i) => (
          <li key={t as string} className={`flex items-center gap-2 transition-all duration-500 ${step >= i + 2 ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}>
            <span className={`grid size-5 place-items-center rounded-full ${ok ? "bg-lime text-lime-foreground" : "border border-caution text-caution"}`}>
              {ok ? <Check className="size-3" /> : <ArrowRight className="size-3" />}
            </span>
            {t}
          </li>
        ))}
      </ul>
      <div className={`mt-8 flex items-end justify-between border-t border-ink-line pt-5 transition-opacity duration-700 ${step >= 5 ? "opacity-100" : "opacity-0"}`}>
        <span className="eyebrow text-ink-muted">Answer score</span>
        <span className="text-5xl font-semibold tracking-tighter">82<span className="text-xl text-ink-muted"> / 100</span></span>
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Logo />
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex" aria-label="Primary">
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#method" className="hover:text-foreground">Method</a>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm hover:underline">Sign in</Link>
          <CTA to="/start-interview" className="hidden py-2 sm:inline-flex">Start practicing</CTA>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-12 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
        <div className="animate-rise">
          <p className="eyebrow text-muted-foreground">Mock interviews · Coaching · Progress</p>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-tighter sm:text-7xl">
            The interview starts before you enter the room.
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Practice realistic technical and HR interviews. Get feedback on what you said, how you said it, and what to improve next.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CTA to="/start-interview">Start a mock interview</CTA>
            <a href="#how" className="inline-flex items-center rounded-lg border px-5 py-3 text-sm font-medium hover:bg-secondary">See how it works</a>
          </div>
        </div>
        <HeroTranscript />
      </section>

      <section id="method" className="border-y">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:items-end">
          <h2 className="text-3xl font-semibold tracking-tight">Built around how real interviews feel.</h2>
          {[
            ["Resume-aware", "Questions come from your actual experience."],
            ["Role-specific", "Tuned to the job you're applying for."],
            ["Feedback-driven", "Every answer ends with a next step."],
          ].map(([t, d]) => (
            <div key={t}>
              <p className="font-medium">{t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-6 py-24">
        <p className="eyebrow text-muted-foreground">How it works</p>
        <div className="mt-10 grid gap-10 md:grid-cols-4">
          {[
            ["01", "Tell us what you're applying for", "Resume + job description."],
            ["02", "Enter the interview", "Questions adapt to your role and performance."],
            ["03", "Answer naturally", "Text or voice."],
            ["04", "Understand your performance", "Get actionable feedback."],
          ].map(([n, t, d]) => (
            <div key={n} className="border-t-2 border-foreground pt-5">
              <span className="text-6xl font-light tracking-tighter text-muted-foreground">{n}</span>
              <h3 className="mt-4 text-lg font-semibold leading-snug">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="space-y-28 pb-28">
        <Feature n="01" title="Your resume becomes the interview blueprint." desc="The questions are designed around the experience you actually put on your resume.">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border bg-card p-5 text-xs leading-relaxed">
              <p className="font-semibold">Alex Johnson</p>
              <p className="text-muted-foreground">Software Engineer</p>
              <div className="mt-4 space-y-1.5">
                <p><mark className="bg-lime/60 px-0.5">Rebuilt student portal in React</mark>, 4k users</p>
                <p>Node.js + <mark className="bg-lime/60 px-0.5">MongoDB</mark> checkout API</p>
                <p>Cut load time by 40%</p>
              </div>
              <div className="mt-4 space-y-1.5">
                {[80, 64, 72, 50].map((w) => <div key={w} className="h-1.5 rounded bg-secondary" style={{ width: `${w}%` }} />)}
              </div>
            </div>
            <div className="space-y-3">
              {["How did you structure state in the student portal?", "Why did your MongoDB query slow down at scale?", "What drove the 40% load-time improvement?"].map((q, i) => (
                <div key={q} className="border-b pb-3 text-sm">
                  <span className="eyebrow text-muted-foreground">Q{i + 1}</span>
                  <p className="mt-1">{q}</p>
                </div>
              ))}
            </div>
          </div>
        </Feature>
        <Feature n="02" title="The interview changes with you." desc="Strong answers raise the bar. Shaky ones go back to fundamentals. It always meets you where you are." flip>
          <div className="rounded-2xl bg-ink p-8 text-ink-foreground">
            <span className="eyebrow text-ink-muted">Answer score</span>
            <p className="text-7xl font-semibold tracking-tighter">91</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-lime px-2.5 py-1 text-xs font-medium text-lime-foreground">
              <TrendingUp className="size-3.5" /> Difficulty ↑ Challenging
            </p>
            <p className="eyebrow mt-8 text-ink-muted">Next question</p>
            <p className="mt-2 text-xl">“Design a scalable architecture for real-time notifications…”</p>
          </div>
        </Feature>
        <Feature n="03" title="Feedback you can actually use." desc="Not a grade. A specific rewrite you can say out loud next time.">
          <div className="space-y-5">
            <div>
              <span className="eyebrow text-muted-foreground">You said</span>
              <p className="mt-2 text-xl text-muted-foreground line-through decoration-1">“I'm good at React.”</p>
            </div>
            <p className="text-sm font-semibold">→ Make it specific.</p>
            <div className="border-l-4 border-lime pl-4">
              <span className="eyebrow text-muted-foreground">Better</span>
              <p className="mt-2 text-xl">“I improved the dashboard load time by 40% by splitting bundles and memoizing heavy charts.”</p>
            </div>
          </div>
        </Feature>
      </section>

      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-tighter sm:text-6xl">Ready when you are.</h2>
          <p className="mt-6 max-w-md text-ink-muted">Fifteen minutes. Ten questions. One clear next step.</p>
          <CTA to="/start-interview" variant="lime" className="mt-10">Start a mock interview</CTA>
        </div>
      </section>
      <footer className="mx-auto flex max-w-6xl justify-between px-6 py-8 text-xs text-muted-foreground">
        <span>AIMC — a prototype</span>
        <span>Simulated feedback for demonstration</span>
      </footer>
    </div>
  );
}

function Feature({ n, title, desc, children, flip }: { n: string; title: string; desc: string; children: React.ReactNode; flip?: boolean }) {
  return (
    <div className={`mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <div>
        <span className="text-8xl font-extralight tracking-tighter text-muted-foreground/60">{n}</span>
        <h3 className="mt-2 max-w-md text-4xl font-semibold leading-tight tracking-tight">{title}</h3>
        <p className="mt-4 max-w-md text-muted-foreground">{desc}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}
