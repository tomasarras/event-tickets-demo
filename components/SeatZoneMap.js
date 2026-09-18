"use client";

import { ZONE_COLORS, ZONE_LABELS } from "@/lib/seatZones";
import { formatPrice } from "@/lib/format";

const COLS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export default function SeatZoneMap({ seats, zonePrices, selected, onToggle, maxSelectable = 8 }) {
  const rows = [...new Set(seats.map((s) => s.row))].sort((a, b) => a - b);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
        {Object.entries(ZONE_LABELS).map(([zone, label]) => (
          <span key={zone} className="flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 rounded"
              style={{ backgroundColor: ZONE_COLORS[zone] }}
            />
            {label} · {formatPrice(zonePrices[zone])}
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded bg-slate-300" />
          Ocupado
        </span>
      </div>

      <div className="mb-4 rounded-md bg-slate-900 py-1.5 text-center text-[11px] font-medium tracking-widest text-white">
        ESCENARIO
      </div>

      <div className="mx-auto max-w-md space-y-1.5 overflow-x-auto">
        {rows.map((row) => (
          <div key={row} className="flex items-center justify-center gap-1">
            <span className="w-5 text-right text-[10px] text-slate-400">{row}</span>
            {COLS.map((col, idx) => {
              const code = `${row}${col}`;
              const seat = seats.find((s) => s.code === code);
              const isSelected = selected.includes(code);
              return (
                <div key={code} className="flex items-center">
                  {idx === 5 && <span className="w-2" />}
                  <button
                    type="button"
                    disabled={seat.occupied || (!isSelected && selected.length >= maxSelectable)}
                    onClick={() => onToggle(code)}
                    title={`${code} · ${ZONE_LABELS[seat.zone]}`}
                    className={`h-5 w-5 rounded text-[9px] font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
                      seat.occupied
                        ? "bg-slate-300 text-slate-400"
                        : isSelected
                          ? "text-white"
                          : "text-white/90 hover:opacity-80"
                    }`}
                    style={{
                      backgroundColor: seat.occupied
                        ? undefined
                        : isSelected
                          ? ZONE_COLORS[seat.zone]
                          : `${ZONE_COLORS[seat.zone]}80`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
