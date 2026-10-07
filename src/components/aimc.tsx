import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function pageMeta(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  };
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" className="flex items-baseline gap-3" aria-label="AIMC home">
      <span className="text-lg font-semibold tracking-tight">
        AIMC<span className="text-lime">.</span>
      </span>
      <span className={cn("eyebrow hidden sm:inline", dark ? "text-ink-muted" : "text-muted-foreground")}>
        AI Mock Interview Coach
      </span>
    </Link>
  );
}

export function CTA({
  to,
  children,
  variant = "dark",
  className,
  onClick,
}: {
  to?: string;
  children: React.ReactNode;
  variant?: "dark" | "lime" | "ghost";
  className?: string;
  onClick?: () => void;
}) {
  const cls = cn(
    "group inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-all",
    variant === "dark" && "bg-primary text-primary-foreground hover:-translate-y-0.5",
    variant === "lime" && "bg-lime text-lime-foreground hover:-translate-y-0.5",
    variant === "ghost" && "border border-border hover:bg-secondary",
    className,
  );
  const inner = (
    <>
      {children}
      {variant !== "ghost" && <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />}
    </>
  );
  if (to)
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {inner}
      </Link>
    );
  return (
    <button type="button" className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}

export function CountUp({ value, duration = 1100 }: { value: number; duration?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <>{n}</>;
}

const appLinks = [
  { to: "/dashboard", label: "Overview" },
  { to: "/interviews", label: "Interviews" },
  { to: "/resume", label: "Resume" },
  { to: "/jobs", label: "Job profiles" },
  { to: "/settings", label: "Settings" },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex" aria-label="App">
            {appLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  path === l.to ? "bg-secondary font-medium" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <CTA to="/start-interview" className="py-2">Start practicing</CTA>
            <span className="grid size-9 place-items-center rounded-full bg-secondary text-xs font-semibold" aria-label="Alex Johnson">
              AJ
            </span>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-3 md:hidden" aria-label="App mobile">
          {appLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn("whitespace-nowrap rounded-md px-3 py-1.5 text-sm", path === l.to ? "bg-secondary font-medium" : "text-muted-foreground")}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>
    </div>
  );
}

export function Breather({ size = 72, active = true }: { size?: number; active?: boolean }) {
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }} aria-hidden>
      <span className={cn("absolute inset-0 rounded-full border border-lime/40", active && "animate-breathe")} />
      <span className={cn("absolute inset-[22%] rounded-full bg-lime/20", active && "animate-breathe")} style={{ animationDelay: "0.4s" }} />
      <span className="size-2 rounded-full bg-lime" />
    </div>
  );
}

export function ScoreBar({ score, className }: { score: number; className?: string }) {
  return (
    <div className={cn("h-1 w-full rounded-full bg-secondary", className)} role="img" aria-label={`Score ${score} of 100`}>
      <div className="h-1 rounded-full bg-primary" style={{ width: `${score}%` }} />
    </div>
  );
}
