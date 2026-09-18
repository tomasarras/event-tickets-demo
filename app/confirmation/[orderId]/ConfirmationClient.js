"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, MapPin } from "lucide-react";
import { getOrder } from "@/lib/ticketOrders";
import { findVenue } from "@/lib/venues";
import { formatDateLong, formatPrice } from "@/lib/format";
import { randomDelay } from "@/lib/delay";
import QRTicket from "@/components/QRTicket";
import { Skeleton } from "@/components/Skeleton";
import { useLanguage } from "@/components/LanguageProvider";

export default function ConfirmationClient({ orderId }) {
  const { t, lang } = useLanguage();
  const [order, setOrder] = useState(undefined);

  useEffect(() => {
    // Orders only exist in this browser's localStorage, so they can only
    // be read after mount (hydration-safe: SSR has no access to it). The
    // delay simulates fetching/verifying the order from a server.
    randomDelay(900, 400).then(() => {
      setOrder(getOrder(orderId));
    });
  }, [orderId]);

  if (order === undefined) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
        <div className="text-center">
          <Skeleton className="mx-auto h-14 w-14 rounded-full" />
          <Skeleton className="mx-auto mt-4 h-7 w-64" />
          <Skeleton className="mx-auto mt-2 h-4 w-40" />
        </div>
        <Skeleton className="mt-8 h-24 w-full rounded-xl" />
        <div className="mt-4 space-y-3">
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 text-center text-slate-500">
        <p>{t("confirmation_not_found")}</p>
        <p className="mt-1 text-sm text-slate-400">{t("confirmation_not_found_hint")}</p>
        <Link href="/" className="mt-4 inline-block text-violet-600 underline">
          {t("common_back_to_home")}
        </Link>
      </div>
    );
  }

  const venue = findVenue(order.event.venueId);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <div className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={28} />
        </span>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">{t("confirmation_title")}</h1>
        <p className="mt-1 text-slate-500">
          {t("confirmation_order_code")}{" "}
          <span className="font-mono font-semibold text-slate-900">{order.id}</span>
        </p>
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm font-semibold text-slate-900">{order.event.title}</p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin size={13} />
          {venue.name} · {venue.city}
        </p>
        <p className="text-xs text-slate-500">
          {formatDateLong(order.event.date, lang)} · {order.event.time}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          {order.buyer.firstName} {order.buyer.lastName} · {t("confirmation_document_short")}{" "}
          {order.buyer.document}
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {order.tickets.map((ticket, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"
          >
            <QRTicket value={`BUTACA|${order.id}|${idx + 1}`} size={88} />
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">{ticket.label}</p>
              <p className="text-xs text-slate-400">
                {t("confirmation_ticket_of", idx + 1, order.tickets.length)}
              </p>
            </div>
            <p className="text-sm font-semibold text-slate-900">{formatPrice(ticket.price, lang)}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5">
        <span className="text-sm font-medium text-slate-600">{t("confirmation_total_paid")}</span>
        <span className="text-xl font-bold text-slate-900">{formatPrice(order.totalPrice, lang)}</span>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/my-tickets"
          className="flex-1 rounded-lg bg-slate-900 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800"
        >
          {t("confirmation_view_tickets")}
        </Link>
        <Link
          href="/"
          className="flex-1 rounded-lg border border-slate-200 py-3 text-center text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          {t("confirmation_more_events")}
        </Link>
      </div>
    </div>
  );
}
