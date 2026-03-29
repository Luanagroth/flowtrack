"use client";

import React, { FormEvent, useMemo, useState } from "react";
import { Task } from "@/types";
import { FilterTabs } from "@/components/FilterTabs";

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function TaskSection({ tasks, setTasks }: Props) {
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [value, setValue] = useState("");

  const filteredTasks = useMemo(() => {
    if (filter === "pending") return tasks.filter((task) => !task.completed);
    if (filter === "completed") return tasks.filter((task) => task.completed);
    return tasks;
  }, [tasks, filter]);

  const tasksCompleted = tasks.filter((task) => task.completed).length;

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
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Tarefas</h2>
        <span className="text-sm text-slate-500">Concluídas: {tasksCompleted}</span>
      </div>
      <form onSubmit={addTask} className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Adicionar nova tarefa"
          className="flex-1 rounded-lg border border-zinc-300 p-2 text-sm outline-none focus:border-sky-500"
        />
        <button className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700" type="submit">
          Adicionar
        </button>
      </form>

      <FilterTabs active={filter} onChange={(tab) => setFilter(tab)} />

      {filteredTasks.length === 0 ? (
        <p className="mt-4 rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500">
          Nenhuma tarefa encontrada para esse filtro.
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {filteredTasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-4 w-4"
                />
                <span className={`${task.completed ? "line-through text-slate-400" : "text-slate-800"}`}>
                  {task.title}
                </span>
              </label>
              <button
                onClick={() => removeTask(task.id)}
                className="rounded-md bg-rose-500 px-2 py-1 text-xs font-medium text-white hover:bg-rose-600"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
