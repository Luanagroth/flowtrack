import React from "react";

export function Header() {
  return (
    <header className="mb-6 flex w-full max-w-6xl flex-col gap-4 rounded-3xl border border-sky-100 bg-gradient-to-r from-white via-sky-50 to-cyan-50 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">FlowTrack</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Painel de produtividade</h1>
      </div>
      <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        Organize tarefas, hábitos, metas, pomodoro e acompanhe o foco diário com persistência local em uma visão clara do seu dia.
      </p>
    </header>
  );
}
