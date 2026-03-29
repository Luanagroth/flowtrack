import React from "react";

export function Header() {
  return (
    <header className="mb-6 flex w-full max-w-6xl flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-wider text-sky-600">FlowTrack</p>
        <h1 className="text-2xl font-bold text-slate-900">Painel de produtividade</h1>
      </div>
      <p className="max-w-lg text-sm text-slate-500">
        Organize tarefas, hábitos, metas, pomodoro e acompanhe o foco diário com persistência local e estilo SaaS.
      </p>
    </header>
  );
}
