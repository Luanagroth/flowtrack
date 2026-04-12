"use client";

import { useCurrentTime } from "@/hooks/useCurrentTime";

export function CurrentTimeCard() {
  const now = useCurrentTime();

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">Agora</p>
      <h2 className="mt-2 text-sm font-semibold text-slate-900">Hora local e data</h2>
      <p className="mt-3 text-4xl font-black tracking-tight text-slate-900">{now.toLocaleTimeString()}</p>
      <p className="mt-1 text-sm text-slate-500">{now.toLocaleDateString()}</p>
    </section>
  );
}
