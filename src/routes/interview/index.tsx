import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Keyboard, Mic, Square, TrendingDown, TrendingUp } from "lucide-react";
import { Breather, pageMeta } from "@/components/aimc";
import { questions } from "@/lib/mock";
import { TOTAL, useSession } from "@/lib/session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/interview/")({
  head: () => pageMeta("Interview room — AIMC", "A calm, focused space to answer your mock interview questions."),
  component: Room,
});

const steps = ["Reading your answer…", "Looking for clarity…", "Checking technical depth…", "Preparing your feedback…"];

function useCountdown(start: number) {
  const [t, setT] = useState(start);
  useEffect(() => {
    const id = setInterval(() => setT((x) => Math.max(0, x - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}

function Room() {
  const s = useSession();
  const nav = useNavigate();
  const q = questions[s.current];
  const time = useCountdown(20 * 60 - s.current * 90);
  const [mode, setMode] = useState<"text" | "voice">("text");
  const [text, setText] = useState("");
  const [rec, setRec] = useState<"idle" | "rec" | "done">("idle");
  const [sec, setSec] = useState(0);
  const [phase, setPhase] = useState(-1);
  const recTimer = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    setText("");
    setRec("idle");
    setPhase(-1);
  }, [s.current]);

  const startRec = () => {
    setRec("rec");
    setSec(0);
    recTimer.current = setInterval(() => setSec((x) => x + 1), 1000);
  };
  const stopRec = () => {
    clearInterval(recTimer.current);
    setRec("done");
    setText(q.sample);
  };
  useEffect(() => () => clearInterval(recTimer.current), []);

  const submit = () => {
    if (!text.trim()) return;
    setPhase(0);
    steps.forEach((_, i) => setTimeout(() => setPhase(i), i * 450));
    setTimeout(() => {
      s.submit(text);
      nav({ to: "/interview/feedback" });
    }, steps.length * 450 + 300);
  };

  const num = String(s.current + 1).padStart(2, "0");
  const remaining = TOTAL - s.current - 1;
  const levelTag = s.level === "Challenging" ? "Challenging" : s.level === "Foundation" ? "Foundation" : null;

  return (
    <div className="room flex min-h-screen flex-col bg-ink text-ink-foreground">
      <header className="flex items-center justify-between px-6 py-5">
        <Link to="/dashboard" className="font-semibold tracking-tight">AIMC<span className="text-lime">.</span></Link>
        <span className="eyebrow text-ink-muted">Question {num} / {TOTAL}</span>
        <span className="font-mono text-sm tabular-nums" aria-label="Time remaining">{time}</span>
      </header>
      <div className="h-px bg-ink-line">
        <div className="h-px bg-lime transition-all duration-700" style={{ width: `${(s.current / TOTAL) * 100}%` }} />
      </div>

      {phase >= 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-8" role="status" aria-live="polite">
          <Breather size={96} />
          <p key={phase} className="animate-rise text-2xl font-medium tracking-tight">{steps[phase]}</p>
          <div className="flex gap-1.5">
            {steps.map((_, i) => <span key={i} className={cn("h-1 w-8 rounded-full transition-colors", i <= phase ? "bg-lime" : "bg-ink-line")} />)}
          </div>
        </div>
      ) : (
        <main className="mx-auto grid w-full max-w-6xl flex-1 gap-12 px-6 py-10 lg:grid-cols-[1fr_auto]">
          <div className="flex flex-col">
            {s.adaptation && (
              <div className="mb-8 flex animate-rise items-center gap-3 self-start rounded-lg border border-ink-line px-4 py-2.5 text-sm">
                {s.adaptation === "up" ? <TrendingUp className="size-4 text-lime" /> : <TrendingDown className="size-4 text-caution" />}
                <span className="eyebrow text-ink-muted">Interview adaptation</span>
                <span>{s.adaptation === "up" ? "Difficulty increased" : "Difficulty adjusted"}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <span className="text-7xl font-light tracking-tighter text-ink-muted">{num}</span>
              <div>
                <p className="text-sm">{remaining === 0 ? "Last question" : `${remaining} questions remaining`}</p>
                <div className="mt-1 flex gap-1">
                  {Array.from({ length: TOTAL }).map((_, i) => <span key={i} className={cn("h-1 w-3 rounded-full", i < s.current ? "bg-lime" : i === s.current ? "bg-ink-foreground" : "bg-ink-line")} />)}
                </div>
              </div>
              {levelTag && <span className={cn("eyebrow ml-auto rounded px-2 py-1", levelTag === "Challenging" ? "bg-lime text-lime-foreground" : "bg-caution text-ink")}>{levelTag}</span>}
            </div>
            <h1 key={s.current} className="mt-8 animate-rise text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{q.text}</h1>
            <p className="mt-4 text-ink-muted">Take your time. Think out loud.</p>

            <div className="mt-10 flex gap-1 self-start rounded-lg border border-ink-line p-1" role="tablist">
              {([["text", Keyboard, "Text"], ["voice", Mic, "Voice"]] as const).map(([m, Icon, l]) => (
                <button key={m} role="tab" aria-selected={mode === m} type="button" onClick={() => setMode(m)} className={cn("inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm", mode === m ? "bg-ink-raised" : "text-ink-muted")}>
                  <Icon className="size-4" /> {l}
                </button>
              ))}
            </div>

            {mode === "text" ? (
              <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write your answer here…" aria-label="Your answer" rows={7}
                className="mt-4 w-full flex-1 resize-none rounded-xl border border-ink-line bg-ink-raised p-5 text-lg leading-relaxed placeholder:text-ink-muted focus:border-ink-muted focus:outline-none" />
            ) : (
              <div className="mt-4 flex min-h-56 flex-col items-center justify-center rounded-xl border border-ink-line bg-ink-raised p-6">
                {rec === "idle" && (
                  <button type="button" onClick={startRec} className="flex flex-col items-center gap-3">
                    <span className="grid size-20 place-items-center rounded-full bg-lime text-lime-foreground transition-transform hover:scale-105"><Mic className="size-8" /></span>
                    <span>Start speaking</span>
                  </button>
                )}
                {rec === "rec" && (
                  <button type="button" onClick={stopRec} className="flex flex-col items-center gap-3" aria-label="Stop recording">
                    <span className="relative grid size-20 place-items-center rounded-full bg-destructive">
                      <span className="absolute inset-0 animate-ping rounded-full bg-destructive/40" />
                      <Square className="size-6 fill-current" />
                    </span>
                    <span className="font-mono text-sm"><span className="text-destructive">●</span> Recording 00:{String(sec).padStart(2, "0")}</span>
                  </button>
                )}
                {rec === "done" && (
                  <div className="w-full">
                    <p className="eyebrow text-ink-muted">Transcript</p>
                    <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} className="mt-2 w-full resize-none bg-transparent leading-relaxed focus:outline-none" />
                    <button type="button" onClick={() => setRec("idle")} className="text-sm text-ink-muted underline">Record again</button>
                  </div>
                )}
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <button type="button" onClick={() => setText(q.sample)} className="text-sm text-ink-muted underline-offset-4 hover:text-ink-foreground hover:underline">Use sample answer (demo)</button>
              <button type="button" onClick={submit} disabled={!text.trim()} className="group inline-flex items-center gap-2 rounded-lg bg-lime px-6 py-3 font-medium text-lime-foreground transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0">
                Submit answer <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </button>
            </div>
          </div>

          <aside className="hidden w-48 flex-col items-center gap-4 pt-24 lg:flex" aria-label="Interviewer status">
            <Breather size={120} />
            <p className="eyebrow text-ink-muted">Interviewer</p>
            <p className="flex items-center gap-2 text-sm"><span className="size-1.5 rounded-full bg-lime" /> {text ? "Listening" : "Waiting for you"}</p>
          </aside>
        </main>
      )}
    </div>
  );
}
