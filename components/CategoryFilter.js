"use client";

import { CATEGORIES } from "@/lib/events";
import { useLanguage } from "@/components/LanguageProvider";

export default function CategoryFilter({ value, onChange }) {
  const { t } = useLanguage();
  const options = [
    { id: "all", label: t("category_all") },
    ...Object.keys(CATEGORIES).map((id) => ({ id, label: t(`category_${id}`) })),
  ];

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
