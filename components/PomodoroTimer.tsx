"use client";

import { useEffect, useRef } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { usePomodoro } from "@/hooks/usePomodoro";

const formatTime = (seconds: number) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
};

export function PomodoroTimer() {
  const { mode, secondsLeft, isRunning, totalFocusHours, start, pause, reset, cycles } = usePomodoro();
  const [soundEnabled, setSoundEnabled] = useLocalStorage<boolean>("flowtrack.pomodoro.soundEnabled", true);
  const previousModeRef = useRef(mode);
  const audioContextRef = useRef<AudioContext | null>(null);

  async function ensureAudioReady() {
    if (typeof window === "undefined") return;

    const AudioContextConstructor = window.AudioContext;
    if (!AudioContextConstructor) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextConstructor();
    }

    if (audioContextRef.current.state === "suspended") {
      try {
        await audioContextRef.current.resume();
      } catch {
        // ignore audio resume failures
      }
    }
  }

  function playCompletionTone(completedMode: "focus" | "break") {
    const audioContext = audioContextRef.current;
    if (!audioContext || audioContext.state !== "running") return;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;

    oscillator.type = completedMode === "focus" ? "triangle" : "sine";
    if (completedMode === "focus") {
      oscillator.frequency.setValueAtTime(880, now);
      oscillator.frequency.exponentialRampToValueAtTime(660, now + 0.18);
    } else {
      oscillator.frequency.setValueAtTime(520, now);
      oscillator.frequency.exponentialRampToValueAtTime(780, now + 0.2);
    }

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.45);
  }

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
  }, [mode, secondsLeft]);

  useEffect(() => {
    const previousMode = previousModeRef.current;
    const didCompleteCycle = previousMode !== mode;

    if (didCompleteCycle) {
      if (soundEnabled) {
        playCompletionTone(previousMode === "focus" ? "focus" : "break");
      }

      if ("Notification" in window && Notification.permission === "granted") {
        const isFocusCompleted = previousMode === "focus";
        new Notification(isFocusCompleted ? "Pomodoro finalizado" : "Pausa finalizada", {
          body: isFocusCompleted ? "Sua pausa de 5 minutos começou automaticamente." : "Um novo ciclo de 25 minutos começou automaticamente.",
          tag: "flowtrack-pomodoro",
        });
      }
    }

    previousModeRef.current = mode;
  }, [mode, soundEnabled]);

  async function handleStart() {
    await ensureAudioReady();
    start();
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Pomodoro</h2>
          <span className="text-sm text-slate-500">{mode === "focus" ? "Foco" : "Pausa de 5 minutos"}</span>
        </div>
        <button
          type="button"
          onClick={() => setSoundEnabled((previous) => !previous)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
            soundEnabled ? "bg-sky-100 text-sky-700 hover:bg-sky-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
          aria-pressed={soundEnabled}
        >
          Som {soundEnabled ? "ligado" : "desligado"}
        </button>
      </div>
      <p className="text-center text-5xl font-bold text-slate-900">{formatTime(secondsLeft)}</p>
      <p className="mt-2 text-center text-sm text-slate-500">Ciclos: {cycles} | Horas de foco: {totalFocusHours}</p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={isRunning ? pause : handleStart}
          className="flex-1 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
        >
          {isRunning ? "Pausar" : "Iniciar"}
        </button>
        <button onClick={reset} className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Resetar
        </button>
      </div>
    </section>
  );
}
