import React from "react";
import { Habit } from "@/types";

interface Props {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
}

export function HabitSection({ habits, setHabits }: Props) {
  const completed = habits.filter((habit) => habit.completed).length;

  function toggleHabit(id: string) {
    setHabits((prev) => prev.map((habit) => (habit.id === id ? { ...habit, completed: !habit.completed } : habit)));
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Hábitos Diários</h2>
        <span className="text-sm text-slate-500">{completed}/{habits.length} concluídos</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {habits.map((habit) => (
          <button
            key={habit.id}
            onClick={() => toggleHabit(habit.id)}
            className={`rounded-xl border p-3 text-left transition ${
              habit.completed
                ? "border-sky-500 bg-sky-50 text-sky-700"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{habit.name}</span>
              <span className="text-xs text-slate-500">{habit.completed ? "Concluído" : "Pendente"}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
