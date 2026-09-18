"use client";

import { Minus, Plus } from "lucide-react";
import { formatPrice } from "@/lib/format";

export default function TicketTierPicker({ tiers, quantities, onChange, maxPerTier = 6 }) {
  return (
    <div className="space-y-3">
      {tiers.map((tier) => {
        const qty = quantities[tier.id] || 0;
        return (
          <div
            key={tier.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
          >
            <div>
              <p className="text-sm font-semibold text-slate-900">{tier.label}</p>
              <p className="text-xs text-slate-500">{formatPrice(tier.price)} por entrada</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onChange(tier.id, Math.max(0, qty - 1))}
                disabled={qty <= 0}
                className="rounded-md border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50 disabled:opacity-30"
                aria-label={`Menos ${tier.label}`}
              >
                <Minus size={14} />
              </button>
              <span className="w-5 text-center text-sm font-medium">{qty}</span>
              <button
                type="button"
                onClick={() => onChange(tier.id, Math.min(maxPerTier, qty + 1))}
                disabled={qty >= maxPerTier}
                className="rounded-md border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50 disabled:opacity-30"
                aria-label={`Más ${tier.label}`}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
