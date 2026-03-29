import React from "react";
import { WeeklyGoal } from "@/types";

interface Props {
  goals: WeeklyGoal[];
  setGoals: React.Dispatch<React.SetStateAction<WeeklyGoal[]>>;
}

export function WeeklyGoalsSection({ goals, setGoals }: Props) {
  function advanceGoal(id: string) {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              progress: Math.min(goal.target, goal.progress + 1),
            }
          : goal
      )
    );
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Metas da Semana</h2>
        <span className="text-sm text-slate-500">{goals.filter((goal) => goal.progress >= goal.target).length}/{goals.length} concluídas</span>
      </div>
      <div className="space-y-3">
        {goals.map((goal) => {
          const progress = Math.max(0, Math.min(100, (goal.progress / goal.target) * 100));
          return (
            <article key={goal.id} className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium text-slate-800">{goal.title}</p>
                <button
                  onClick={() => advanceGoal(goal.id)}
                  className="rounded-lg bg-sky-600 px-2 py-1 text-xs text-white hover:bg-sky-700"
                >
                  +1
                </button>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                <div className="h-2 rounded-full bg-sky-500" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-1 text-xs text-slate-500">{goal.progress}/{goal.target} concluído</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
