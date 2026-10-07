import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
import { CountUp, pageMeta } from "@/components/aimc";
import { questions } from "@/lib/mock";
import { TOTAL, useSession, verdict } from "@/lib/session";

export const Route = createFileRoute("/interview/feedback")({
  head: () => pageMeta("Answer feedback — AIMC", "What worked, what to strengthen, and your coach's suggestion."),
  component: Feedback,
});

function Feedback() {
  const s = useSession();
  const nav = useNavigate();
  const q = questions[s.current];
  const a = s.answers.find((x) => x.q === s.current);
  const score = a?.score ?? 82;
  const last = s.current + 1 >= TOTAL;
  const nextLevel = score >= 86 ? "up" : score < 75 ? "down" : null;

  return (
    <div className="room min-h-screen bg-ink text-ink-foreground">
      <header className="flex items-center justify-between px-6 py-5">
        <span className="font-semibold tracking-tight">AIMC<span className="text-lime">.</span></span>
        <span className="eyebrow text-ink-muted">Feedback · Question {String(s.current + 1).padStart(2, "0")}</span>
        <span />
      </header>
      <main className="mx-auto max-w-5xl px-6 pb-20 pt-8">
        <p className="text-ink-muted">{q.text}</p>
        <div className="mt-6 flex flex-wrap items-end gap-6">
          <span className="text-[8rem] font-semibold leading-none tracking-tighter sm:text-[10rem]"><CountUp value={score} /></span>
          <div className="pb-4">
            <p className="text-ink-muted">/ 100</p>
            <p className="text-2xl font-semibold">{verdict(score)}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <section className="animate-rise" style={{ animationDelay: "0.3s" }}>
            <h2 className="eyebrow text-lime">What worked</h2>
            <ul className="mt-4 space-y-3">
              {q.worked.map((w) => <li key={w} className="flex gap-3"><Check className="mt-0.5 size-5 shrink-0 text-lime" aria-hidden /> {w}</li>)}
            </ul>
          </section>
          <section className="animate-rise" style={{ animationDelay: "0.5s" }}>
            <h2 className="eyebrow text-caution">Make it stronger</h2>
            <ul className="mt-4 space-y-3">
              {q.stronger.map((w) => <li key={w} className="flex gap-3"><ArrowRight className="mt-0.5 size-5 shrink-0 text-caution" aria-hidden /> {w}</li>)}
            </ul>
          </section>
        </div>

        <section className="mt-12 animate-rise border-l-4 border-lime pl-6" style={{ animationDelay: "0.7s" }}>
          <p className="eyebrow text-ink-muted">Coach's suggestion</p>
          <p className="mt-2 text-2xl font-medium tracking-tight">{q.suggestion}</p>
        </section>

        {nextLevel && !last && (
          <div className="mt-10 animate-rise rounded-xl border border-ink-line p-5" style={{ animationDelay: "0.9s" }}>
            <p className="eyebrow text-ink-muted">Interview adaptation</p>
            <p className="mt-2">{nextLevel === "up" ? "“You handled that well.”" : "“Let's strengthen the fundamentals.”"}</p>
            <p className="mt-1 font-semibold">{nextLevel === "up" ? "Difficulty increased → CHALLENGING" : "Difficulty adjusted → FOUNDATION"}</p>
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-3">
          <button type="button" onClick={() => { s.retry(); nav({ to: "/interview" }); }} className="inline-flex items-center gap-2 rounded-lg border border-ink-line px-5 py-3 text-sm hover:bg-ink-raised">
            <RotateCcw className="size-4" /> Try again
          </button>
          <button type="button" onClick={() => { s.next(); nav({ to: last ? "/interview/completed" : "/interview" }); }} className="group inline-flex items-center gap-2 rounded-lg bg-lime px-6 py-3 text-sm font-medium text-lime-foreground transition-transform hover:-translate-y-0.5">
            {last ? "Finish interview" : "Next question"} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          {!last && s.answers.length >= 2 && (
            <button type="button" onClick={() => nav({ to: "/interview/completed" })} className="px-3 text-sm text-ink-muted underline-offset-4 hover:underline">End early & see report</button>
          )}
        </div>
      </main>
    </div>
  );
}
