import React, { FormEvent, useMemo, useState } from "react";
import { WeeklyGoal } from "@/types";

interface Props {
  goals: WeeklyGoal[];
  setGoals: React.Dispatch<React.SetStateAction<WeeklyGoal[]>>;
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h4l10-10-4-4L4 16v4Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m12 6 4 4" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 11v6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 11v6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 7l1 12h10l1-12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7V4h6v3" />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 4h10a2 2 0 0 1 2 2v12l-4-3H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h4" />
    </svg>
  );
}

export function WeeklyGoalsSection({ goals, setGoals }: Props) {
  const [value, setValue] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingTarget, setEditingTarget] = useState("");
  const [editingProgress, setEditingProgress] = useState("");
  const [noteEditorGoalId, setNoteEditorGoalId] = useState<string | null>(null);
  const [noteValue, setNoteValue] = useState("");

  const completedCount = useMemo(() => goals.filter((goal) => goal.progress >= goal.target).length, [goals]);

  function addGoal(event: FormEvent) {
    event.preventDefault();
    const title = value.trim();
    const target = Math.max(1, Number(targetValue) || 1);
    if (!title) return;

    setGoals((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        title,
        target,
        progress: 0,
      },
    ]);

    setValue("");
    setTargetValue("");
  }

  function removeGoal(id: string) {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
    if (editingId === id) {
      cancelEditing();
    }
    if (noteEditorGoalId === id) {
      closeNoteEditor();
    }
  }

  function startEditing(goal: WeeklyGoal) {
    setEditingId(goal.id);
    setEditingTitle(goal.title);
    setEditingTarget(String(goal.target));
    setEditingProgress(String(goal.progress));
  }

  function cancelEditing() {
    setEditingId(null);
    setEditingTitle("");
    setEditingTarget("");
    setEditingProgress("");
  }

  function saveGoal(event: FormEvent) {
    event.preventDefault();
    if (!editingId) return;

    const title = editingTitle.trim();
    const target = Math.max(1, Number(editingTarget) || 1);
    const progress = Math.min(target, Math.max(0, Number(editingProgress) || 0));
    if (!title) return;

    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === editingId
          ? {
              ...goal,
              title,
              target,
              progress,
            }
          : goal
      )
    );

    cancelEditing();
  }

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

  function toggleGoalCompleted(id: string) {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              progress: goal.progress >= goal.target ? Math.max(goal.target - 1, 0) : goal.target,
            }
          : goal
      )
    );
  }

  function openNoteEditor(goal: WeeklyGoal) {
    setNoteEditorGoalId(goal.id);
    setNoteValue(goal.note ?? "");
  }

  function closeNoteEditor() {
    setNoteEditorGoalId(null);
    setNoteValue("");
  }

  function saveNote(goalId: string) {
    const trimmedNote = noteValue.trim();

    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              note: trimmedNote || undefined,
            }
          : goal
      )
    );

    closeNoteEditor();
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Metas da semana</h2>
        <span className="text-sm text-slate-500">{completedCount}/{goals.length} concluídas</span>
      </div>

      <form onSubmit={addGoal} className="mb-4 grid gap-2 sm:grid-cols-[1fr_110px_auto]">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Ex.: Planejar a sprint"
          className="rounded-lg border border-zinc-300 p-2 text-sm outline-none placeholder:text-slate-400 focus:border-sky-500"
        />
        <input
          value={targetValue}
          onChange={(event) => setTargetValue(event.target.value)}
          inputMode="numeric"
          placeholder="Ex.: 5"
          aria-label="Total da meta"
          className="rounded-lg border border-zinc-300 p-2 text-sm outline-none placeholder:text-slate-400 focus:border-sky-500"
        />
        <button className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700" type="submit">
          Adicionar
        </button>
      </form>

      {goals.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500">
          Nenhuma meta cadastrada ainda.
        </p>
      ) : (
        <div className="space-y-3">
          {goals.map((goal) => {
            const progress = Math.max(0, Math.min(100, (goal.progress / goal.target) * 100));
            const isCompleted = goal.progress >= goal.target;
            const isEditing = editingId === goal.id;
            const isEditingNote = noteEditorGoalId === goal.id;

            return (
              <article
                key={goal.id}
                className={`rounded-lg border p-3 transition ${
                  isCompleted ? "border-emerald-200 bg-emerald-50/50" : "border-slate-200 bg-white"
                }`}
              >
                {isEditing ? (
                  <form onSubmit={saveGoal} className="space-y-3">
                    <input
                      value={editingTitle}
                      onChange={(event) => setEditingTitle(event.target.value)}
                      placeholder="Ex.: Finalizar onboarding"
                      className="w-full rounded-lg border border-zinc-300 p-2 text-sm outline-none placeholder:text-slate-400 focus:border-sky-500"
                      autoFocus
                    />
                    <div className="grid gap-2 sm:grid-cols-2">
                      <input
                        value={editingTarget}
                        onChange={(event) => setEditingTarget(event.target.value)}
                        inputMode="numeric"
                        placeholder="Ex.: 5"
                        aria-label="Total da meta"
                        className="rounded-lg border border-zinc-300 p-2 text-sm outline-none placeholder:text-slate-400 focus:border-sky-500"
                      />
                      <input
                        value={editingProgress}
                        onChange={(event) => setEditingProgress(event.target.value)}
                        inputMode="numeric"
                        placeholder="Ex.: 2"
                        aria-label="Progresso da meta"
                        className="rounded-lg border border-zinc-300 p-2 text-sm outline-none placeholder:text-slate-400 focus:border-sky-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700" type="submit">
                        Salvar
                      </button>
                      <button
                        type="button"
                        onClick={cancelEditing}
                        className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => toggleGoalCompleted(goal.id)}
                        className="flex flex-1 items-start gap-3 rounded-lg text-left"
                        aria-label={`Alternar meta ${goal.title}`}
                      >
                        <span
                          className={`mt-1 h-3 w-3 rounded-full border ${
                            isCompleted ? "border-emerald-500 bg-emerald-500" : "border-amber-400 bg-amber-300"
                          }`}
                          aria-hidden="true"
                        />
                        <span className="flex-1">
                          <span className={`block font-medium ${isCompleted ? "text-emerald-700" : "text-slate-800"}`}>
                            {goal.title}
                          </span>
                          <span className="mt-1 block text-xs text-slate-500">
                            {goal.progress}/{goal.target} concluído
                          </span>
                          {goal.note ? <span className="mt-2 block text-sm text-slate-500">{goal.note}</span> : null}
                        </span>
                      </button>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openNoteEditor(goal)}
                          className="inline-flex items-center justify-center rounded-md border border-slate-300 p-2 text-slate-700 transition hover:bg-slate-50"
                          aria-label={goal.note ? `Editar nota da meta ${goal.title}` : `Adicionar nota na meta ${goal.title}`}
                        >
                          <NoteIcon />
                        </button>
                        <button
                          type="button"
                          onClick={() => startEditing(goal)}
                          className="inline-flex items-center justify-center rounded-md border border-slate-300 p-2 text-slate-700 transition hover:bg-slate-50"
                          aria-label={`Editar meta ${goal.title}`}
                        >
                          <PencilIcon />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeGoal(goal.id)}
                          className="inline-flex items-center justify-center rounded-md border border-slate-300 p-2 text-slate-700 transition hover:bg-slate-50"
                          aria-label={`Remover meta ${goal.title}`}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 h-2 w-full rounded-full bg-slate-200">
                      <div
                        className={`h-2 rounded-full transition-all ${isCompleted ? "bg-emerald-500" : "bg-sky-500"}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    {isEditingNote ? (
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          saveNote(goal.id);
                        }}
                        className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3"
                      >
                        <textarea
                          value={noteValue}
                          onChange={(event) => setNoteValue(event.target.value)}
                          placeholder="Ex.: Validar com o time até sexta"
                          className="min-h-20 w-full resize-none rounded-lg border border-zinc-300 bg-white p-2 text-sm outline-none placeholder:text-slate-400 focus:border-sky-500"
                        />
                        <div className="mt-3 flex gap-2">
                          <button className="rounded-md bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700" type="submit">
                            Salvar nota
                          </button>
                          <button
                            type="button"
                            onClick={closeNoteEditor}
                            className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                          >
                            Cancelar
                          </button>
                        </div>
                      </form>
                    ) : null}

                    <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
                      <span className="text-xs text-slate-500">{isCompleted ? "Meta concluída" : "Meta em andamento"}</span>
                      <div className="flex gap-2">
                        {!isCompleted ? (
                          <button
                            type="button"
                            onClick={() => advanceGoal(goal.id)}
                            className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          >
                            +1 progresso
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => toggleGoalCompleted(goal.id)}
                          className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          {isCompleted ? "Reabrir" : "Concluir"}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
