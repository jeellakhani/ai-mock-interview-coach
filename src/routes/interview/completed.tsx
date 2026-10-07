import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Breather, CTA, CountUp, pageMeta } from "@/components/aimc";
import { overallScore, useSession } from "@/lib/session";

export const Route = createFileRoute("/interview/completed")({
  head: () => pageMeta("You finished — AIMC", "Your interview is complete. See what it revealed."),
  component: Completed,
});

function Completed() {
  const { answers } = useSession();
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const a = setTimeout(() => setPhase(1), 1600);
    const b = setTimeout(() => setPhase(2), 3600);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);
  const score = overallScore(answers);
  return (
    <div className="room flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center text-ink-foreground">
      <h1 className="animate-rise text-6xl font-semibold tracking-tighter sm:text-8xl">You finished.</h1>
      <p className="mt-4 animate-rise text-lg text-ink-muted" style={{ animationDelay: "0.4s" }}>Now let's see what the interview revealed.</p>
      <div className="mt-16 flex min-h-56 flex-col items-center" aria-live="polite">
        {phase === 1 && (
          <div className="flex animate-rise flex-col items-center gap-6">
            <Breather size={88} />
            <p>Building your performance profile…</p>
          </div>
        )}
        {phase === 2 && (
          <div className="animate-rise">
            <p className="eyebrow text-ink-muted">Interview readiness</p>
            <p className="text-[9rem] font-semibold leading-none tracking-tighter"><CountUp value={score} /></p>
            <CTA to="/report" variant="lime" className="mt-8">See your full report</CTA>
          </div>
        )}
      </div>
    </div>
  );
}
