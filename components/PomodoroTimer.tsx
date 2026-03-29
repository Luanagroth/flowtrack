"use client";

import { useEffect } from "react";
import { usePomodoro } from "@/hooks/usePomodoro";

const formatTime = (seconds: number) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
};

export function PomodoroTimer() {
  const { mode, secondsLeft, isRunning, totalFocusHours, start, pause, reset, cycles } = usePomodoro();

  useEffect(() => {
    if (!("Notification" in window)) return;
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (!("Notification" in window)) return;

    if (mode === "focus" && secondsLeft === 300 && Notification.permission === "granted") {
      new Notification("Faltam 5 minutos para a pausa");
    }

    if (secondsLeft === 0 && Notification.permission === "granted") {
      const label = mode === "focus" ? "Hora da pausa" : "Hora de voltar ao foco";
      new Notification(label);
    }
  }, [mode, secondsLeft]);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Pomodoro</h2>
        <span className="text-sm text-slate-500">{mode === "focus" ? "Foco" : mode === "shortBreak" ? "Pausa curta" : "Pausa longa"}</span>
      </div>
      <p className="text-center text-5xl font-bold text-slate-900">{formatTime(secondsLeft)}</p>
      <p className="mt-2 text-center text-sm text-slate-500">Ciclos: {cycles} | Horas de foco: {totalFocusHours}</p>
      <div className="mt-4 flex gap-2">
        <button onClick={isRunning ? pause : start} className="flex-1 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">
          {isRunning ? "Pausar" : "Iniciar"}
        </button>
        <button onClick={reset} className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Resetar
        </button>
      </div>
    </section>
  );
}
