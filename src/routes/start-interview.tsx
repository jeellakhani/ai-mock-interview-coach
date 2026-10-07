import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, FileText, X } from "lucide-react";
import { CTA, Logo, pageMeta } from "@/components/aimc";
import { candidate, roles, sampleJD } from "@/lib/mock";
import { useSession, type Level } from "@/lib/session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/start-interview")({
  head: () => pageMeta("Set up your interview — AIMC", "Choose your role, interview type and difficulty in four quick steps."),
  component: Setup,
});

const types = [
  ["Technical", "Concepts, debugging and system thinking for your role."],
  ["HR / Behavioral", "Stories about teamwork, conflict and growth."],
  ["Mixed", "A realistic blend, like most first-round interviews."],
] as const;
const levels: [Level, string, string][] = [
  ["Foundation", "Comfortable", "Build confidence on the fundamentals."],
  ["Balanced", "Balanced", "Designed to stretch you without overwhelming you."],
  ["Challenging", "Challenging", "Senior-level follow-ups and deeper probing."],
];

function Tile({ selected, onClick, children, className }: { selected: boolean; onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "relative rounded-xl border-2 p-5 text-left transition-all hover:-translate-y-0.5",
        selected ? "border-foreground bg-card" : "border-border hover:border-muted-foreground",
        className,
      )}
    >
      {selected && <span className="absolute right-4 top-4 grid size-6 place-items-center rounded-full bg-lime text-lime-foreground"><Check className="size-3.5" /></span>}
      {children}
    </button>
  );
}

function Setup() {
  const s = useSession();
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState(s.setup.role);
  const [type, setType] = useState(s.setup.type);
  const [diff, setDiff] = useState<Level>(s.setup.difficulty);
  const [resume, setResume] = useState(s.setup.resume);
  const [jd, setJd] = useState(s.setup.jd);

  const titles = ["What are you preparing for?", "What kind of interview?", "How challenging should it feel?", "Give your interviewer some context.", "Your interview"];

  const enter = () => {
    s.setSetup({ role, type, difficulty: diff, resume, jd });
    s.start();
    nav({ to: "/interview" });
  };

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Logo />
        <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">Save & exit</Link>
      </header>
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-8">
        <div className="flex items-center gap-2" aria-label={`Step ${Math.min(step + 1, 4)} of 4`}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-1 flex-1 rounded-full bg-secondary">
              <div className="h-1 rounded-full bg-primary transition-all duration-500" style={{ width: step > i ? "100%" : step === i ? "35%" : "0%" }} />
            </div>
          ))}
        </div>
        <p className="eyebrow mt-8 text-muted-foreground">{step < 4 ? `Step 0${step + 1} / 04` : "Almost ready"}</p>
        <h1 key={step} className="mt-3 animate-rise text-4xl font-semibold tracking-tighter sm:text-6xl">{titles[step]}</h1>
        {step === 3 && <p className="mt-3 text-muted-foreground">Your personalized interview is almost ready.</p>}

        <div key={`b${step}`} className="mt-10 animate-rise">
          {step === 0 && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {roles.map((r) => (
                <Tile key={r} selected={role === r} onClick={() => setRole(r)} className="py-8">
                  <span className="text-lg font-medium">{r}</span>
                </Tile>
              ))}
            </div>
          )}
          {step === 1 && (
            <div className="grid gap-3 md:grid-cols-3">
              {types.map(([t, d]) => (
                <Tile key={t} selected={type === t} onClick={() => setType(t)} className="min-h-48">
                  <span className="eyebrow text-base font-semibold">{t}</span>
                  <p className="mt-16 text-sm text-muted-foreground">{d}</p>
                </Tile>
              ))}
            </div>
          )}
          {step === 2 && (
            <div>
              <div className="grid grid-cols-3 rounded-xl border-2 p-1" role="radiogroup" aria-label="Difficulty">
                {levels.map(([v, label]) => (
                  <button key={v} role="radio" aria-checked={diff === v} type="button" onClick={() => setDiff(v)}
                    className={cn("rounded-lg py-6 text-sm font-medium transition-all sm:text-lg", diff === v ? "bg-primary text-primary-foreground" : "hover:bg-secondary")}>
                    {label}
                  </button>
                ))}
              </div>
              <p className="mt-6 text-lg text-muted-foreground">{levels.find((l) => l[0] === diff)?.[2]}</p>
            </div>
          )}
          {step === 3 && (
            <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
              <div>
                <p className="eyebrow text-muted-foreground">Resume</p>
                {resume ? (
                  <div className="mt-3 flex items-center gap-3 rounded-xl border-2 border-foreground bg-card p-4">
                    <FileText className="size-8" />
                    <div className="flex-1">
                      <p className="font-medium">{candidate.resume}</p>
                      <p className="text-xs text-muted-foreground">5 skills detected · 2 pages</p>
                    </div>
                    <button type="button" aria-label="Remove resume" onClick={() => setResume(false)} className="rounded p-1 hover:bg-secondary"><X className="size-4" /></button>
                  </div>
                ) : (
                  <button type="button" onClick={() => setResume(true)} className="mt-3 w-full rounded-xl border-2 border-dashed p-8 text-sm text-muted-foreground hover:border-foreground">
                    Drop your PDF here or <span className="font-medium text-foreground underline">use sample resume</span>
                  </button>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="jd" className="eyebrow text-muted-foreground">Job description</label>
                  <button type="button" onClick={() => setJd(sampleJD)} className="text-sm font-medium underline-offset-4 hover:underline">Use sample job description</button>
                </div>
                <textarea id="jd" value={jd} onChange={(e) => setJd(e.target.value)} rows={10} placeholder="Paste the job description here…" className="mt-3 w-full rounded-xl border bg-card p-4 text-sm leading-relaxed" />
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
              <dl className="divide-y border-y">
                {[["Role", role], ["Interview", type], ["Difficulty", levels.find((l) => l[0] === diff)?.[1]], ["Questions", "10"], ["Estimated time", "15–20 minutes"], ["Context", `${resume ? candidate.resume : "No resume"}${jd ? " + job description" : ""}`]].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-4">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-col justify-end">
                <p className="text-muted-foreground">Find a quiet spot. There's no wrong answer here — only practice.</p>
                <button type="button" onClick={enter} className="group mt-6 flex items-center justify-between rounded-2xl bg-ink px-8 py-8 text-3xl font-semibold tracking-tight text-ink-foreground transition-transform hover:-translate-y-1">
                  Enter interview <span className="text-lime transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 flex items-center justify-between">
          {step > 0 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Back</button>
          ) : <span />}
          {step < 4 && <CTA onClick={() => setStep(step + 1)}>{step === 3 ? "Review" : "Continue"}</CTA>}
        </div>
      </main>
    </div>
  );
}
