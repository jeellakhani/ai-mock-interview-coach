import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { questions } from "./mock";

export type Level = "Foundation" | "Balanced" | "Challenging";
export type Setup = { role: string; type: string; difficulty: Level; resume: boolean; jd: string };
export type Answer = { q: number; text: string; score: number; level: Level };

type State = {
  setup: Setup;
  answers: Answer[];
  current: number;
  level: Level;
  adaptation: "up" | "down" | null;
};

const initial: State = {
  setup: { role: "Software Engineer", type: "Technical", difficulty: "Balanced", resume: true, jd: "" },
  answers: [],
  current: 0,
  level: "Balanced",
  adaptation: null,
};

export const TOTAL = questions.length;

function scoreAnswer(text: string, q: number, level: Level) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  let s = questions[q].base;
  s += Math.min(8, Math.floor(words / 9)) - 4;
  if (/\d/.test(text)) s += 3;
  if (words < 12) s -= 16;
  if (level === "Challenging") s -= 2;
  return Math.max(58, Math.min(96, s));
}

type Ctx = State & {
  setSetup: (s: Partial<Setup>) => void;
  start: () => void;
  submit: (text: string) => Answer;
  next: () => boolean;
  retry: () => void;
};

const SessionCtx = createContext<Ctx | null>(null);
const KEY = "aimc-session";

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initial);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    sessionStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  const ctx: Ctx = {
    ...state,
    setSetup: (s) => setState((p) => ({ ...p, setup: { ...p.setup, ...s } })),
    start: () =>
      setState((p) => ({ ...p, answers: [], current: 0, level: p.setup.difficulty, adaptation: null })),
    submit: (text) => {
      const a: Answer = { q: state.current, text, score: scoreAnswer(text, state.current, state.level), level: state.level };
      setState((p) => ({ ...p, answers: [...p.answers.filter((x) => x.q !== p.current), a] }));
      return a;
    },
    next: () => {
      const last = state.answers.find((a) => a.q === state.current);
      const done = state.current + 1 >= TOTAL;
      setState((p) => {
        let level = p.level;
        let adaptation: State["adaptation"] = null;
        if (last && last.score >= 86) {
          adaptation = "up";
          level = "Challenging";
        } else if (last && last.score < 75) {
          adaptation = "down";
          level = "Foundation";
        } else level = p.setup.difficulty === "Challenging" ? "Challenging" : "Balanced";
        return { ...p, current: Math.min(p.current + 1, TOTAL - 1), level, adaptation };
      });
      return done;
    },
    retry: () => setState((p) => ({ ...p, answers: p.answers.filter((a) => a.q !== p.current), adaptation: null })),
  };

  return <SessionCtx.Provider value={ctx}>{children}</SessionCtx.Provider>;
}

export function useSession() {
  const c = useContext(SessionCtx);
  if (!c) throw new Error("SessionProvider missing");
  return c;
}

export function overallScore(answers: Answer[]) {
  if (!answers.length) return 86;
  return Math.round(answers.reduce((s, a) => s + a.score, 0) / answers.length);
}

export function verdict(score: number) {
  if (score >= 88) return "Excellent answer";
  if (score >= 80) return "Strong answer";
  if (score >= 72) return "Good foundation";
  return "Let's build on this";
}
