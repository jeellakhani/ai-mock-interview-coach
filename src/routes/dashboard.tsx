import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { AppShell, CTA, CountUp, pageMeta } from "@/components/aimc";
import { candidate, history, trend } from "@/lib/mock";
import { TOTAL, useSession } from "@/lib/session";

export const Route = createFileRoute("/dashboard")({
  head: () => pageMeta("Your coaching overview — AIMC", "See your interview readiness, your biggest opportunity and recent practice."),
  component: Dashboard,
});

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

function Dashboard() {
  const { answers } = useSession();
  const [greet, setGreet] = useState("Good evening");
  useEffect(() => setGreet(greeting()), []);
  const inProgress = answers.length > 0 && answers.length < TOTAL;
  const pct = Math.round((answers.length / TOTAL) * 100);

  return (
    <AppShell>
      <section className="animate-rise">
        <h1 className="text-5xl font-semibold tracking-tighter sm:text-6xl">{greet}, {candidate.first}.</h1>
        <p className="mt-3 text-lg text-muted-foreground">Your next interview could be better than your last.</p>
        <CTA to="/start-interview" className="mt-8">Start practicing</CTA>
      </section>

      {inProgress && (
        <Link to="/interview" className="mt-10 block rounded-xl border-2 border-foreground p-5 transition-colors hover:bg-secondary">
          <p className="font-semibold">Your interview is {pct}% complete</p>
          <p className="text-sm text-muted-foreground">Finish your interview to unlock your performance report.</p>
          <div className="mt-3 h-1 rounded-full bg-secondary"><div className="h-1 rounded-full bg-primary" style={{ width: `${pct}%` }} /></div>
        </Link>
      )}

      <section className="mt-16 grid gap-12 border-t pt-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow text-muted-foreground">Interview readiness</p>
          <p className="text-[9rem] font-semibold leading-none tracking-tighter"><CountUp value={86} /></p>
          <p className="mt-2 inline-flex items-center gap-2 text-sm"><span className="rounded bg-lime px-1.5 py-0.5 font-medium text-lime-foreground">+8</span> points from your last interview</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
              <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", background: "var(--card)" }} />
              <Line type="monotone" dataKey="s" name="Score" stroke="var(--foreground)" strokeWidth={2.5} dot={{ r: 4, fill: "var(--background)", strokeWidth: 2 }} activeDot={{ r: 6, fill: "var(--lime)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="mt-16 rounded-2xl bg-ink p-8 text-ink-foreground sm:p-12">
        <p className="eyebrow text-ink-muted">Your biggest opportunity</p>
        <h2 className="mt-4 text-5xl font-semibold tracking-tighter">Be more specific.</h2>
        <p className="mt-4 max-w-xl text-ink-muted">You communicate clearly, but your answers would be stronger with measurable results and concrete examples.</p>
        <CTA to="/start-interview" variant="lime" className="mt-8">Practice this skill</CTA>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Recent interviews</h2>
          <Link to="/interviews" className="text-sm text-muted-foreground hover:text-foreground">View all →</Link>
        </div>
        <ol className="mt-8 border-l pl-8">
          {history.slice(0, 3).map((h, i) => (
            <li key={h.date} className="relative pb-8 last:pb-0">
              <span className={`absolute -left-[37px] top-1.5 size-3 rounded-full border-2 border-foreground ${i === 0 ? "bg-lime" : "bg-background"}`} />
              <div className="flex flex-wrap items-baseline gap-x-6">
                <span className="w-20 text-sm font-semibold">{h.date}</span>
                <span className="flex-1">{h.role}</span>
                <span className="eyebrow text-muted-foreground">{h.type}</span>
                <span className="w-12 text-right text-2xl font-semibold tracking-tight">{h.score}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </AppShell>
  );
}
