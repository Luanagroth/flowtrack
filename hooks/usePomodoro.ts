"use client";

import { useCallback, useEffect, useState } from "react";
import { PomodoroMode } from "@/types";

const FOCUS_SECONDS = 25 * 60;
const SHORT_BREAK_SECONDS = 5 * 60;
const LONG_BREAK_SECONDS = 15 * 60;

interface PomodoroState {
  mode: PomodoroMode;
  secondsLeft: number;
  isRunning: boolean;
  focusSecondsCompleted: number;
  cycles: number;
}

const STORAGE_KEY = "flowtrack.pomodoro";

function getInitial() {
  if (typeof window === "undefined") {
    return {
      mode: "focus" as PomodoroMode,
      secondsLeft: FOCUS_SECONDS,
      isRunning: false,
      focusSecondsCompleted: 0,
      cycles: 0,
    };
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null") as PomodoroState | null;
    if (parsed && typeof parsed === "object") return parsed;
  } catch {
    // ignore
  }

  return {
    mode: "focus" as PomodoroMode,
    secondsLeft: FOCUS_SECONDS,
    isRunning: false,
    focusSecondsCompleted: 0,
    cycles: 0,
  };
}

export function usePomodoro() {
  const [state, setState] = useState<PomodoroState>(getInitial);

  const saveState = useCallback((nextState: PomodoroState) => {
    setState(nextState);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    } catch {
      // ignore
    }
  }, []);

  const reset = useCallback(() => {
    saveState({
      mode: "focus",
      secondsLeft: FOCUS_SECONDS,
      isRunning: false,
      focusSecondsCompleted: 0,
      cycles: 0,
    });
  }, [saveState]);

  const start = useCallback(() => saveState({ ...state, isRunning: true }), [saveState, state]);
  const pause = useCallback(() => saveState({ ...state, isRunning: false }), [saveState, state]);

  const tick = useCallback(() => {
    if (!state.isRunning) return;
    if (state.secondsLeft <= 0) return;

    const newSecondsLeft = state.secondsLeft - 1;
    const completedFocus = state.mode === "focus" && state.secondsLeft > 0;

    if (newSecondsLeft > 0) {
      saveState({ ...state, secondsLeft: newSecondsLeft, focusSecondsCompleted: state.focusSecondsCompleted + (completedFocus ? 1 : 0) });
      return;
    }

    // transition
    let nextMode: PomodoroMode = "focus";
    let nextSeconds = FOCUS_SECONDS;
    let nextCycles = state.cycles;

    if (state.mode === "focus") {
      nextCycles += 1;
      if (nextCycles > 0 && nextCycles % 4 === 0) {
        nextMode = "longBreak";
        nextSeconds = LONG_BREAK_SECONDS;
      } else {
        nextMode = "shortBreak";
        nextSeconds = SHORT_BREAK_SECONDS;
      }
    } else {
      nextMode = "focus";
      nextSeconds = FOCUS_SECONDS;
    }

    saveState({
      mode: nextMode,
      secondsLeft: nextSeconds,
      isRunning: true,
      focusSecondsCompleted: state.focusSecondsCompleted + (state.mode === "focus" ? 1 : 0),
      cycles: nextCycles,
    });
  }, [saveState, state]);

  useEffect(() => {
    const interval = setInterval(() => tick(), 1000);
    return () => clearInterval(interval);
  }, [tick]);

  const totalFocusHours = Math.round((state.focusSecondsCompleted / 3600) * 10) / 10;

  return {
    mode: state.mode,
    secondsLeft: state.secondsLeft,
    isRunning: state.isRunning,
    focusSecondsCompleted: state.focusSecondsCompleted,
    totalFocusHours,
    cycles: state.cycles,
    start,
    pause,
    reset,
  };
}
