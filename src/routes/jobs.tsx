import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell, ScoreBar, pageMeta } from "@/components/aimc";
import { jobs } from "@/lib/mock";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/jobs")({
  head: () => pageMeta("Job profiles — AIMC", "Saved roles with your readiness for each one."),
  component: Jobs,
});

function Jobs() {
  const s = useSession();
  const nav = useNavigate();
  return (
    <AppShell>
      <h1 className="text-5xl font-semibold tracking-tighter">Job profiles</h1>
      <p className="mt-3 text-muted-foreground">The roles you're preparing for.</p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {jobs.map((j) => (
          <div key={j.title} className="flex flex-col rounded-xl border p-6">
            <h2 className="text-xl font-semibold">{j.title}</h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {j.skills.map((k) => <span key={k} className="rounded-md bg-secondary px-2 py-0.5 text-xs">{k}</span>)}
            </div>
            <p className="eyebrow mt-8 text-muted-foreground">Interview readiness</p>
            <p className="text-5xl font-semibold tracking-tighter">{j.readiness}%</p>
            <ScoreBar score={j.readiness} className="mt-3" />
            <button type="button" onClick={() => { s.setSetup({ role: j.title.replace("Engineer", "Developer").replace("Software Developer", "Software Engineer") }); nav({ to: "/start-interview" }); }}
              className="mt-6 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
              Practice for this role →
            </button>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
