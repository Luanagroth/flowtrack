import React from "react";

interface Props {
  tasksCompleted: number;
  focusHours: number;
  dailyGoal: number;
}

export function SummaryCards({ tasksCompleted, focusHours, dailyGoal }: Props) {
  return (
    <section className="grid w-full max-w-6xl grid-cols-1 gap-3 sm:grid-cols-3">
      <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h3 className="text-xs uppercase tracking-widest text-slate-400">Tarefas concluídas</h3>
        <p className="mt-2 text-3xl font-bold text-slate-900">{tasksCompleted}</p>
      </article>
      <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h3 className="text-xs uppercase tracking-widest text-slate-400">Horas de foco</h3>
        <p className="mt-2 text-3xl font-bold text-slate-900">{focusHours}</p>
      </article>
      <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h3 className="text-xs uppercase tracking-widest text-slate-400">Meta diária</h3>
        <p className="mt-2 text-3xl font-bold text-slate-900">{dailyGoal} tarefas</p>
      </article>
    </section>
  );
}
