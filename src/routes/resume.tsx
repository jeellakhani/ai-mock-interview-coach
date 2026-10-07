import { createFileRoute } from "@tanstack/react-router";
import { Check, FileText } from "lucide-react";
import { AppShell, CTA, pageMeta } from "@/components/aimc";
import { candidate } from "@/lib/mock";

export const Route = createFileRoute("/resume")({
  head: () => pageMeta("Resume workspace — AIMC", "See how your resume shapes the questions in your mock interviews."),
  component: Resume,
});

function Resume() {
  return (
    <AppShell>
      <div className="flex items-center gap-3">
        <FileText className="size-6" />
        <h1 className="text-3xl font-semibold tracking-tight">{candidate.resume}</h1>
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <article className="rounded-xl border bg-card p-10 text-sm leading-relaxed shadow-sm">
          <h2 className="text-2xl font-semibold">Alex Johnson</h2>
          <p className="text-muted-foreground">Software Engineer · alex.johnson@example.com</p>
          <h3 className="eyebrow mt-8 text-muted-foreground">Experience</h3>
          <p className="mt-2 font-medium">Full-stack Developer — Campus Labs (2024–now)</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Rebuilt the student portal in <mark className="bg-lime/60">React</mark>, serving 4,000 users; cut load time 40%.</li>
            <li>Built a checkout API in <mark className="bg-lime/60">Node.js</mark> with <mark className="bg-lime/60">MongoDB</mark>; p95 latency 4.2s → 180ms.</li>
            <li>Designed versioned <mark className="bg-lime/60">REST APIs</mark> consumed by 3 client apps.</li>
          </ul>
          <p className="mt-5 font-medium">Frontend Intern — Brightside (2023)</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Shipped accessible components in <mark className="bg-lime/60">JavaScript</mark> and TypeScript.</li>
          </ul>
          <h3 className="eyebrow mt-8 text-muted-foreground">Education</h3>
          <p className="mt-2">B.Tech, Computer Science — 2024</p>
        </article>
        <aside>
          <h2 className="text-xl font-semibold">Interview coverage</h2>
          <p className="mt-1 text-sm text-muted-foreground">Skills from your resume that your interviews will test.</p>
          <ul className="mt-6 divide-y border-y">
            {candidate.skills.map((s) => (
              <li key={s} className="flex items-center justify-between py-3">
                {s}
                <span className="grid size-6 place-items-center rounded-full bg-lime text-lime-foreground" aria-label="Covered"><Check className="size-3.5" /></span>
              </li>
            ))}
          </ul>
          <CTA to="/start-interview" className="mt-8">Practice with this resume</CTA>
        </aside>
      </div>
    </AppShell>
  );
}
