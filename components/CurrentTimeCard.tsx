"use client";

import { useCurrentTime } from "@/hooks/useCurrentTime";

export function CurrentTimeCard() {
  const now = useCurrentTime();

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-900">Hora local</h2>
      <p className="mt-2 text-3xl font-bold text-slate-900">{now.toLocaleTimeString()}</p>
      <p className="text-sm text-slate-500">{now.toLocaleDateString()}</p>
    </section>
  );
}
