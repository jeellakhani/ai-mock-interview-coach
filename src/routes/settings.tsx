import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, pageMeta } from "@/components/aimc";
import { candidate } from "@/lib/mock";
import { useSession, type Level } from "@/lib/session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => pageMeta("Settings — AIMC", "Your profile and interview preferences."),
  component: Settings,
});

function Seg<T extends string>({ value, options, onChange, label }: { value: T; options: T[]; onChange: (v: T) => void; label: string }) {
  return (
    <div className="inline-flex rounded-lg border p-1" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button key={o} type="button" role="radio" aria-checked={value === o} onClick={() => onChange(o)} className={cn("rounded-md px-3 py-1.5 text-sm", value === o ? "bg-primary text-primary-foreground" : "hover:bg-secondary")}>{o}</button>
      ))}
    </div>
  );
}

function Settings() {
  const s = useSession();
  const [theme, setTheme] = useState("Light");
  const [saved, setSaved] = useState(false);
  return (
    <AppShell>
      <h1 className="text-5xl font-semibold tracking-tighter">Settings</h1>
      <div className="mt-10 max-w-2xl divide-y border-y">
        <section className="grid gap-4 py-8 sm:grid-cols-[12rem_1fr]">
          <h2 className="font-semibold">Profile</h2>
          <div className="space-y-3">
            <label className="block text-sm">Name<input defaultValue={candidate.name} className="mt-1 w-full rounded-lg border bg-card px-3 py-2" /></label>
            <label className="block text-sm">Email<input defaultValue={candidate.email} className="mt-1 w-full rounded-lg border bg-card px-3 py-2" /></label>
          </div>
        </section>
        <section className="grid gap-4 py-8 sm:grid-cols-[12rem_1fr]">
          <h2 className="font-semibold">Interview preferences</h2>
          <div className="space-y-5">
            <div><p className="mb-2 text-sm text-muted-foreground">Default difficulty</p><Seg<Level> label="Default difficulty" value={s.setup.difficulty} options={["Foundation", "Balanced", "Challenging"]} onChange={(v) => s.setSetup({ difficulty: v })} /></div>
            <div><p className="mb-2 text-sm text-muted-foreground">Default interview type</p><Seg label="Default type" value={s.setup.type} options={["Technical", "HR / Behavioral", "Mixed"]} onChange={(v) => s.setSetup({ type: v })} /></div>
          </div>
        </section>
        <section className="grid gap-4 py-8 sm:grid-cols-[12rem_1fr]">
          <h2 className="font-semibold">Appearance</h2>
          <Seg label="Appearance" value={theme} options={["Light", "System"]} onChange={setTheme} />
        </section>
      </div>
      <button type="button" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} className="mt-8 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
        {saved ? "Saved ✓" : "Save changes"}
      </button>
    </AppShell>
  );
}
