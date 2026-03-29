import React from "react";

type TabKey = "all" | "pending" | "completed";

interface Props {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}

export function FilterTabs({ active, onChange }: Props) {
  const tabs: { key: TabKey; label: string }[] = [
    { key: "all", label: "Todas" },
    { key: "pending", label: "Pendentes" },
    { key: "completed", label: "Concluídas" },
  ];

  return (
    <div className="mt-4 flex items-center gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            active === tab.key
              ? "bg-sky-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
