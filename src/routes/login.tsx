import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo, pageMeta } from "@/components/aimc";
import { candidate } from "@/lib/mock";

export const Route = createFileRoute("/login")({
  head: () => pageMeta("Sign in — AIMC", "Sign in to continue practicing your mock interviews."),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState(candidate.email);
  const [pw, setPw] = useState("practice");
  const [err, setErr] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return setErr("Please enter a valid email address.");
    nav({ to: "/dashboard" });
  };
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-between bg-ink p-10 text-ink-foreground">
        <Logo dark />
        <h1 className="max-w-lg text-5xl font-semibold leading-[0.95] tracking-tighter sm:text-6xl">
          Your next interview is <span className="text-lime">practice</span> away.
        </h1>
        <p className="text-sm text-ink-muted">Calm, honest coaching for every answer.</p>
      </div>
      <div className="flex items-center justify-center p-10">
        <form onSubmit={submit} className="w-full max-w-sm space-y-5" noValidate>
          <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
          <label className="block text-sm">
            Email
            <input value={email} onChange={(e) => { setEmail(e.target.value); setErr(""); }} type="email" className="mt-1.5 w-full rounded-lg border bg-card px-3 py-2.5" aria-invalid={!!err} />
          </label>
          {err && <p className="text-sm text-destructive" role="alert">{err}</p>}
          <label className="block text-sm">
            Password
            <input value={pw} onChange={(e) => setPw(e.target.value)} type="password" className="mt-1.5 w-full rounded-lg border bg-card px-3 py-2.5" />
          </label>
          <button type="submit" className="w-full rounded-lg bg-primary py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">Continue →</button>
          <button type="button" className="w-full rounded-lg border py-3 text-sm" title="Not available in the prototype">Continue with Google</button>
          <p className="text-center text-xs text-muted-foreground">Prototype: any credentials sign you in.</p>
        </form>
      </div>
    </div>
  );
}
