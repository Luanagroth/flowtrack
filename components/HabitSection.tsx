import React, { FormEvent, KeyboardEvent, useState } from "react";
import { Habit } from "@/types";

interface Props {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
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

export function HabitSection({ habits, setHabits }: Props) {
  const [value, setValue] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [noteEditorHabitId, setNoteEditorHabitId] = useState<string | null>(null);
  const [noteValue, setNoteValue] = useState("");
  const completed = habits.filter((habit) => habit.completed).length;

  function addHabit(event: FormEvent) {
    event.preventDefault();
    const name = value.trim();
    if (!name) return;

    setHabits((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        name,
        completed: false,
      },
    ]);
    setValue("");
  }

  function toggleHabit(id: string) {
    setHabits((prev) => prev.map((habit) => (habit.id === id ? { ...habit, completed: !habit.completed } : habit)));
  }

  function startEditing(habit: Habit) {
    setEditingId(habit.id);
    setEditingValue(habit.name);
  }

  function saveHabit(event: FormEvent) {
    event.preventDefault();
    const name = editingValue.trim();
    if (!editingId || !name) return;

    setHabits((prev) => prev.map((habit) => (habit.id === editingId ? { ...habit, name } : habit)));
    cancelEditing();
  }

  function cancelEditing() {
    setEditingId(null);
    setEditingValue("");
  }

  function handleEditingKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      cancelEditing();
    }
  }

  function openNoteEditor(habit: Habit) {
    setNoteEditorHabitId(habit.id);
    setNoteValue(habit.note ?? "");
  }

  function closeNoteEditor() {
    setNoteEditorHabitId(null);
    setNoteValue("");
  }

  function saveNote(habitId: string) {
    const trimmedNote = noteValue.trim();

    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              note: trimmedNote || undefined,
            }
          : habit
      )
    );

    closeNoteEditor();
  }

  function removeHabit(id: string) {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
    if (editingId === id) {
      cancelEditing();
    }
    if (noteEditorHabitId === id) {
      closeNoteEditor();
    }
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Hábitos diários</h2>
        <span className="text-sm text-slate-500">{completed}/{habits.length} concluídos</span>
      </div>

      <form onSubmit={addHabit} className="mb-4 flex gap-2">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Ex.: Beber 2L de água"
          className="flex-1 rounded-lg border border-zinc-300 p-2 text-sm outline-none placeholder:text-slate-400 focus:border-sky-500"
        />
        <button className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700" type="submit">
          Adicionar
        </button>
      </form>

      {habits.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500">
          Nenhum hábito cadastrado ainda.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {habits.map((habit) => {
            const isEditing = editingId === habit.id;
            const isEditingNote = noteEditorHabitId === habit.id;
            const saveDisabled = editingValue.trim().length === 0;

            return (
              <div
                key={habit.id}
                className={`rounded-xl border p-3 transition-all duration-200 ${
                  habit.completed ? "border-sky-500 bg-sky-50" : "border-slate-200 bg-white"
                } ${isEditing ? "habit-editing-panel shadow-[0_12px_30px_-18px_rgba(14,165,233,0.5)] ring-1 ring-sky-200" : ""}`}
              >
                {isEditing ? (
                  <form onSubmit={saveHabit} className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden="true" />
                      <input
                        value={editingValue}
                        onChange={(event) => setEditingValue(event.target.value)}
                        onKeyDown={handleEditingKeyDown}
                        placeholder="Ex.: Ler 20 páginas"
                        className="flex-1 rounded-lg border border-sky-300 bg-white p-2 text-sm outline-none placeholder:text-slate-400 focus:border-sky-500"
                        autoFocus
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={saveDisabled}
                        className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
                      >
                        Salvar
                      </button>
                      <button
                        type="button"
                        onClick={cancelEditing}
                        className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                      >
                        Cancelar
                      </button>
                    </div>
                    <p className="text-xs text-slate-500">Pressione Enter para salvar ou Esc para cancelar.</p>
                  </form>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => toggleHabit(habit.id)}
                        className="flex flex-1 items-start gap-3 rounded-lg text-left"
                        aria-label={`Alternar hábito ${habit.name}`}
                      >
                        <span
                          className={`mt-1 h-3 w-3 rounded-full border ${
                            habit.completed ? "border-sky-500 bg-sky-500" : "border-slate-300 bg-white"
                          }`}
                          aria-hidden="true"
                        />
                        <span className="flex-1">
                          <span className={`block font-medium ${habit.completed ? "text-sky-700" : "text-slate-800"}`}>
                            {habit.name}
                          </span>
                          <span className="mt-1 block text-xs text-slate-500">
                            {habit.completed ? "Concluído" : "Pendente"}
                          </span>
                          {habit.note ? <span className="mt-2 block text-sm text-slate-500">{habit.note}</span> : null}
                        </span>
                      </button>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openNoteEditor(habit)}
                          className="inline-flex items-center justify-center rounded-md border border-slate-300 p-2 text-slate-700 transition hover:bg-slate-50"
                          aria-label={habit.note ? `Editar nota do hábito ${habit.name}` : `Adicionar nota no hábito ${habit.name}`}
                        >
                          <NoteIcon />
                        </button>
                        <button
                          type="button"
                          onClick={() => startEditing(habit)}
                          className="inline-flex items-center justify-center rounded-md border border-slate-300 p-2 text-slate-700 transition hover:bg-slate-50"
                          aria-label={`Editar hábito ${habit.name}`}
                        >
                          <PencilIcon />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeHabit(habit.id)}
                          className="inline-flex items-center justify-center rounded-md border border-slate-300 p-2 text-slate-700 transition hover:bg-slate-50"
                          aria-label={`Remover hábito ${habit.name}`}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </div>

                    {isEditingNote ? (
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          saveNote(habit.id);
                        }}
                        className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3"
                      >
                        <textarea
                          value={noteValue}
                          onChange={(event) => setNoteValue(event.target.value)}
                          placeholder="Ex.: Fazer antes das 8h"
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

                    <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 text-xs text-slate-500">
                      <span>{habit.completed ? "Marcado como feito" : "Toque para concluir"}</span>
                      <button
                        type="button"
                        onClick={() => startEditing(habit)}
                        className="font-medium text-sky-700 hover:text-sky-800"
                      >
                        Renomear
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
