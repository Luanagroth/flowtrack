import { Habit, WeeklyGoal } from "@/types";

export const initialHabits: Habit[] = [
  { id: "habit-water", name: "Água", completed: false },
  { id: "habit-reading", name: "Leitura", completed: false },
  { id: "habit-exercise", name: "Exercício", completed: false },
  { id: "habit-study", name: "Estudo", completed: false },
];

export const initialWeeklyGoals: WeeklyGoal[] = [
  { id: "goal-1", title: "Planejar sprint", target: 1, progress: 0 },
  { id: "goal-2", title: "Concluir 4 tarefas prioritárias", target: 4, progress: 1 },
  { id: "goal-3", title: "Focar 10h", target: 10, progress: 6 },
  { id: "goal-4", title: "Revisar hábitos diários", target: 7, progress: 3 },
];
