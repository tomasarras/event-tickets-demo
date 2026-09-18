"use client";

import { CATEGORIES } from "@/lib/events";

export default function CategoryFilter({ value, onChange }) {
  const options = [{ id: "all", label: "Todos" }, ...Object.entries(CATEGORIES).map(([id, c]) => ({ id, label: c.label }))];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
            value === opt.id
              ? "bg-violet-600 text-white"
              : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-slate-300"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
