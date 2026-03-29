export type PomodoroMode = "focus" | "shortBreak" | "longBreak";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface Habit {
  id: string;
  name: string;
  completed: boolean;
}

export interface WeeklyGoal {
  id: string;
  title: string;
  target: number;
  progress: number;
}
