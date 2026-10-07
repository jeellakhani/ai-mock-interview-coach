import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";
import { AppShell, CTA, CountUp, ScoreBar, pageMeta } from "@/components/aimc";
import { questions } from "@/lib/mock";
import { overallScore, useSession } from "@/lib/session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/report")({
  head: () => pageMeta("Performance report — AIMC", "Your interview readiness, strengths, next improvements and a question-by-question review."),
  component: Report,
});

const fallback = [82, 88, 86, 80, 84].map((score, q) => ({ q, score, text: questions[q].sample, level: "Balanced" as const }));

function Report() {
  const s = useSession();
  const answers = s.answers.length ? s.answers : fallback;
  const score = overallScore(answers);
  const [open, setOpen] = useState<number | null>(0);
  const skills = [
    { k: "Technical knowledge", v: Math.min(96, score + 4) },
    { k: "Problem solving", v: Math.min(96, score + 1) },
    { k: "Communication", v: Math.min(96, score + 3) },
    { k: "Confidence", v: score - 4 },
    { k: "Relevance", v: score - 2 },
  ];

  return (
    <AppShell>
      <section className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="animate-rise">
          <p className="eyebrow text-muted-foreground">Performance report · {s.setup.role} · {s.setup.type}</p>
          <p className="mt-4 text-[11rem] font-semibold leading-[0.8] tracking-tighter sm:text-[14rem]"><CountUp value={score} /></p>
          <p className="mt-4 text-xl font-semibold">Interview readiness</p>
          <p className="mt-2 max-w-md text-lg text-muted-foreground">You are showing strong technical fundamentals. 2 areas are holding your score back.</p>
        </div>
        <div>
          <p className="eyebrow text-muted-foreground">Performance profile</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skills} outerRadius="72%">
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="k" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Radar dataKey="v" stroke="var(--foreground)" strokeWidth={2} fill="var(--lime)" fillOpacity={0.55} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <dl className="space-y-2">
            {skills.map((k) => (
              <div key={k.k} className="grid grid-cols-[1fr_2fr_2rem] items-center gap-3 text-sm">
                <dt className="text-muted-foreground">{k.k}</dt>
                <dd><ScoreBar score={k.v} /></dd>
                <dd className="text-right font-medium tabular-nums">{k.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mt-24 border-t pt-12">
        <h2 className="text-3xl font-semibold tracking-tight">Keep doing this</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {[["Structured thinking", "You break complex problems into logical steps."], ["Technical foundation", "You understand the core concepts behind your answers."], ["Communication", "You explain ideas clearly."]].map(([t, d]) => (
            <div key={t} className="border-l-2 border-lime pl-4">
              <p className="font-semibold">{t}</p>
              <p className="mt-1 text-muted-foreground">“{d}”</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-2xl bg-ink p-8 text-ink-foreground sm:p-12">
        <h2 className="text-3xl font-semibold tracking-tight">Your next 3 improvements</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {[["01", "Add evidence", "Use specific examples and measurable results."], ["02", "Go one level deeper", "Explain why your solution works."], ["03", "Finish with impact", "Explain the result of your decisions."]].map(([n, t, d]) => (
            <div key={n}>
              <span className="text-6xl font-light tracking-tighter text-ink-muted">{n}</span>
              <p className="mt-3 text-xl font-semibold">{t}</p>
              <p className="mt-1 text-ink-muted">{d}</p>
              <CTA to="/start-interview" variant="lime" className="mt-5 px-4 py-2">Practice this</CTA>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-3xl font-semibold tracking-tight">Question by question</h2>
        <ol className="mt-8 border-l">
          {answers.map((a, i) => {
            const q = questions[a.q];
            const isOpen = open === i;
            return (
              <li key={a.q} className="relative pl-8">
                <span className="absolute -left-[7px] top-6 size-3 rounded-full border-2 border-foreground bg-background" />
                <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center gap-6 border-b py-5 text-left">
                  <span className="font-mono text-sm text-muted-foreground">{String(a.q + 1).padStart(2, "0")}</span>
                  <span className="flex-1">
                    <span className="block font-medium">{q.text}</span>
                    <span className="text-sm text-muted-foreground">{q.verdict}</span>
                  </span>
                  <span className="text-2xl font-semibold tabular-nums">{a.score}<span className="text-sm text-muted-foreground"> / 100</span></span>
                  <ChevronDown className={cn("size-4 transition-transform", isOpen && "rotate-180")} />
                </button>
                {isOpen && (
                  <div className="grid animate-rise gap-6 py-6 md:grid-cols-2">
                    <div>
                      <p className="eyebrow text-muted-foreground">Your answer</p>
                      <p className="mt-2 text-sm leading-relaxed">{a.text}</p>
                    </div>
                    <div>
                      <p className="eyebrow text-muted-foreground">Make it stronger</p>
                      <ul className="mt-2 space-y-1 text-sm">{q.stronger.map((x) => <li key={x}>→ {x}</li>)}</ul>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-24">
        <p className="eyebrow text-muted-foreground">Better answer</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Hear the difference.</h2>
        <div className="mt-8 grid overflow-hidden rounded-2xl border md:grid-cols-2">
          <div className="bg-card p-8">
            <p className="eyebrow text-muted-foreground">Your answer</p>
            <p className="mt-4 text-2xl leading-snug text-muted-foreground">“I am good at React and have worked on multiple projects.”</p>
            <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
              <li>✕ No specific project</li><li>✕ No measurable result</li><li>✕ Claims skill instead of showing it</li>
            </ul>
          </div>
          <div className="bg-ink p-8 text-ink-foreground">
            <p className="eyebrow text-lime">Stronger version</p>
            <p className="mt-4 text-2xl leading-snug">
              “I built a <mark className="rounded bg-lime px-1 text-lime-foreground">React dashboard used by 4,000 students</mark>. By splitting bundles and memoizing heavy charts, I <mark className="rounded bg-lime px-1 text-lime-foreground">cut load time by 40%</mark>, which <mark className="rounded bg-lime px-1 text-lime-foreground">halved support tickets</mark> about slowness.”
            </p>
            <ul className="mt-8 space-y-2 text-sm text-ink-muted">
              <li>✓ Names a real project and scale</li><li>✓ Explains how</li><li>✓ Ends with impact</li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-xl font-medium">You know exactly what to work on next.</p>
        <CTA to="/start-interview" className="mt-5">Practice again</CTA>
      </section>
    </AppShell>
  );
}
