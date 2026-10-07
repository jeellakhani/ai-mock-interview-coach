import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, ScoreBar, pageMeta } from "@/components/aimc";
import { history } from "@/lib/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/interviews")({
  head: () => pageMeta("Your interview history — AIMC", "Every mock interview you've practiced, with scores and progress over time."),
  component: Interviews,
});

const filters = ["All", "Technical", "HR", "Mixed"];

function Interviews() {
  const [f, setF] = useState("All");
  const list = history.filter((h) => f === "All" || h.type === f);
  return (
    <AppShell>
      <h1 className="text-5xl font-semibold tracking-tighter">Your interview history</h1>
      <p className="mt-3 text-muted-foreground">From 71 to 86 in five sessions. Keep going.</p>
      <div className="mt-8 flex gap-2" role="group" aria-label="Filter by type">
        {filters.map((x) => (
          <button key={x} type="button" aria-pressed={f === x} onClick={() => setF(x)} className={cn("rounded-full border px-4 py-1.5 text-sm", f === x ? "border-foreground bg-primary text-primary-foreground" : "hover:bg-secondary")}>{x}</button>
        ))}
      </div>
      <ol className="mt-10 divide-y border-y">
        {list.map((h) => (
          <li key={h.date}>
            <Link to="/report" className="grid grid-cols-[5rem_1fr_auto] items-center gap-6 py-6 transition-colors hover:bg-secondary/60 sm:grid-cols-[6rem_1fr_8rem_12rem_3rem]">
              <span className="text-sm font-semibold">{h.date}</span>
              <span className="font-medium">{h.role}</span>
              <span className="eyebrow hidden text-muted-foreground sm:block">{h.type}</span>
              <ScoreBar score={h.score} className="hidden sm:block" />
              <span className="text-right text-3xl font-semibold tracking-tight">{h.score}</span>
            </Link>
          </li>
        ))}
        {!list.length && <li className="py-10 text-center text-muted-foreground">No interviews of this type yet.</li>}
      </ol>
    </AppShell>
  );
}
