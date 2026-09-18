"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, Ticket } from "lucide-react";
import { getAllOrders } from "@/lib/ticketOrders";
import { findVenue } from "@/lib/venues";
import { formatDateLong, formatPrice } from "@/lib/format";

export default function MyTicketsPage() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    // Orders only exist in this browser's localStorage, so they can only
    // be read after mount (hydration-safe: SSR has no access to it).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrders(getAllOrders());
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Mis entradas</h1>
      <p className="mt-1 text-sm text-slate-500">
        Guardadas solo en este navegador — es una demo sin backend ni base de datos.
      </p>

      {orders === null ? null : orders.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <Ticket className="mx-auto text-slate-300" size={32} />
          <p className="mt-3 text-slate-500">Todavía no compraste ninguna entrada.</p>
          <Link href="/" className="mt-4 inline-block text-sm font-semibold text-violet-600 underline">
            Ver eventos
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {orders.map((order) => {
            const venue = findVenue(order.event.venueId);
            return (
              <Link
                key={order.id}
                href={`/confirmation/${order.id}`}
                className="block rounded-xl border border-slate-200 bg-white p-4 hover:border-violet-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-white">
                      <Ticket size={16} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{order.event.title}</p>
                      <p className="flex items-center gap-1 text-xs text-slate-400">
                        <CalendarDays size={12} />
                        {formatDateLong(order.event.date)} · {venue.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        Código {order.id} · {order.tickets.length} entrada
                        {order.tickets.length > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {formatPrice(order.totalPrice)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
