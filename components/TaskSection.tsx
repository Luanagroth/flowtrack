"use client";

import React, { FormEvent, useMemo, useState } from "react";
import { Task } from "@/types";

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
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

export function TaskSection({ tasks, setTasks }: Props) {
  const [value, setValue] = useState("");
  const [noteEditorTaskId, setNoteEditorTaskId] = useState<string | null>(null);
  const [noteValue, setNoteValue] = useState("");

  const pendingTasks = useMemo(() => tasks.filter((task) => !task.completed), [tasks]);
  const completedTasks = useMemo(() => tasks.filter((task) => task.completed), [tasks]);

  function addTask(event: FormEvent) {
    event.preventDefault();
    const title = value.trim();
    if (!title) return;

    setTasks((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        title,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
    setValue("");
  }

  function toggleTask(id: string) {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (noteEditorTaskId === id) {
      closeNoteEditor();
    }
  }

  function openNoteEditor(task: Task) {
    setNoteEditorTaskId(task.id);
    setNoteValue(task.note ?? "");
  }

  function closeNoteEditor() {
    setNoteEditorTaskId(null);
    setNoteValue("");
  }

  function saveNote(taskId: string) {
    const trimmedNote = noteValue.trim();

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              note: trimmedNote || undefined,
            }
          : task
      )
    );

    closeNoteEditor();
  }

  function renderTaskItem(task: Task, tone: "pending" | "completed") {
    const isCompleted = tone === "completed";
    const isEditingNote = noteEditorTaskId === task.id;

    return (
      <li
        key={task.id}
        className={`rounded-lg border bg-white px-3 py-3 ${
          isCompleted ? "border-emerald-100" : "border-amber-100"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <button
            type="button"
            onClick={() => toggleTask(task.id)}
            className="flex flex-1 items-start gap-3 rounded-lg text-left"
            aria-label={`Alternar tarefa ${task.title}`}
          >
            <span
              className={`mt-1 h-3 w-3 rounded-full border ${
                isCompleted ? "border-emerald-500 bg-emerald-500" : "border-amber-400 bg-amber-300"
              }`}
              aria-hidden="true"
            />
            <span className="flex-1">
              <span className={`block ${isCompleted ? "text-slate-400 line-through" : "text-slate-800"}`}>{task.title}</span>
              {task.note ? <span className="mt-1 block text-sm text-slate-500">{task.note}</span> : null}
            </span>
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => openNoteEditor(task)}
              className="inline-flex items-center justify-center rounded-md border border-slate-300 p-2 text-slate-700 transition hover:bg-slate-50"
              aria-label={task.note ? `Editar nota da tarefa ${task.title}` : `Adicionar nota na tarefa ${task.title}`}
            >
              <NoteIcon />
            </button>
            <button
              type="button"
              onClick={() => removeTask(task.id)}
              className="inline-flex items-center justify-center rounded-md border border-slate-300 p-2 text-slate-700 transition hover:bg-slate-50"
              aria-label={`Remover tarefa ${task.title}`}
            >
              <TrashIcon />
            </button>
          </div>
        </div>

        {isEditingNote ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              saveNote(task.id);
            }}
            className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3"
          >
            <textarea
              value={noteValue}
              onChange={(event) => setNoteValue(event.target.value)}
              placeholder="Ex.: Revisar antes da reunião"
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
      </li>
    );
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Tarefas</h2>
          <p className="mt-1 text-sm text-slate-500">Organize por status, toque na bolinha para concluir e adicione notas quando precisar.</p>
        </div>
        <div className="flex gap-2 text-xs text-slate-500">
          <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">{pendingTasks.length} pendentes</span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">{completedTasks.length} concluídas</span>
        </div>
      </div>

      <form onSubmit={addTask} className="mb-4 flex gap-2">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Ex.: Revisar proposta comercial"
          className="flex-1 rounded-lg border border-zinc-300 p-2 text-sm outline-none placeholder:text-slate-400 focus:border-sky-500"
        />
        <button className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700" type="submit">
          Adicionar
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500">
          Nenhuma tarefa criada ainda.
        </p>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-3">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">Pendentes</h3>
              <span className="text-xs text-amber-700">{pendingTasks.length} tarefas</span>
            </div>

            {pendingTasks.length === 0 ? (
              <p className="text-sm text-slate-500">Nenhuma tarefa pendente.</p>
            ) : (
              <ul className="space-y-2">{pendingTasks.map((task) => renderTaskItem(task, "pending"))}</ul>
            )}
          </div>

          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">Concluídas</h3>
              <span className="text-xs text-emerald-700">{completedTasks.length} tarefas</span>
            </div>

            {completedTasks.length === 0 ? (
              <p className="text-sm text-slate-500">Nenhuma tarefa concluída ainda.</p>
            ) : (
              <ul className="space-y-2">{completedTasks.map((task) => renderTaskItem(task, "completed"))}</ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
