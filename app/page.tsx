"use client";

import { useMemo } from "react";
import { Header } from "@/components/Header";
import { SummaryCards } from "@/components/SummaryCards";
import { CurrentTimeCard } from "@/components/CurrentTimeCard";
import { HabitSection } from "@/components/HabitSection";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import { TaskSection } from "@/components/TaskSection";
import { WeeklyGoalsSection } from "@/components/WeeklyGoalsSection";
import { initialHabits, initialWeeklyGoals } from "@/lib/data";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { usePomodoro } from "@/hooks/usePomodoro";
import type { Habit, Task, WeeklyGoal } from "@/types";

export default function Home() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("flowtrack.tasks", []);
  const [habits, setHabits] = useLocalStorage<Habit[]>("flowtrack.habits", initialHabits);
  const [goals, setGoals] = useLocalStorage<WeeklyGoal[]>("flowtrack.goals", initialWeeklyGoals);
  const [dailyTarget] = useLocalStorage<number>("flowtrack.dailyTarget", 5);

  const tasksCompleted = useMemo(() => tasks.filter((task) => task.completed).length, [tasks]);
  const { totalFocusHours } = usePomodoro();

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-800 sm:p-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <Header />

        <SummaryCards tasksCompleted={tasksCompleted} focusHours={Math.round(totalFocusHours * 10) / 10} dailyGoal={dailyTarget} />

        <div className="grid gap-4 xl:grid-cols-[1.05fr_1.25fr]">
          <CurrentTimeCard />
          <PomodoroTimer />
        </div>

        <HabitSection habits={habits} setHabits={setHabits} />

        <TaskSection tasks={tasks} setTasks={setTasks} />

        <WeeklyGoalsSection goals={goals} setGoals={setGoals} />
      </div>
    </main>
  );
}
