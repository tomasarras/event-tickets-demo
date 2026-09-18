"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ShieldAlert } from "lucide-react";
import { findEvent } from "@/lib/events";
import { findVenue } from "@/lib/venues";
import { generateVenueSeats, ZONE_LABELS } from "@/lib/seatZones";
import { formatDateLong, formatPrice } from "@/lib/format";
import { generateOrderRef, saveOrder } from "@/lib/ticketOrders";
import { randomDelay } from "@/lib/delay";
import StepIndicator from "@/components/StepIndicator";
import BuyerForm from "@/components/BuyerForm";

const STEPS = ["Comprador", "Pago"];

function emptyBuyer() {
  return { firstName: "", lastName: "", document: "", email: "" };
}

function buildTickets(event, searchParams) {
  if (event.seated) {
    const seats = (searchParams.get("seats") || "").split(",").filter(Boolean);
    const seatMap = generateVenueSeats(event.id);
    return seats.map((code) => {
      const seat = seatMap.find((s) => s.code === code);
      const zone = seat?.zone || "platea";
      return {
        label: `Asiento ${code} · ${ZONE_LABELS[zone]}`,
        price: event.zonePrices[zone],
      };
    });
  }

  const tiersParam = searchParams.get("tiers") || "";
  const tickets = [];
  tiersParam.split(",").forEach((part) => {
    const [tierId, qtyStr] = part.split(":");
    const tier = event.tiers.find((t) => t.id === tierId);
    const qty = Number(qtyStr) || 0;
    if (!tier) return;
    for (let i = 0; i < qty; i++) {
      tickets.push({ label: tier.label, price: tier.price });
    }
  });
  return tickets;
}

export default function CheckoutFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("event");
  const event = eventId ? findEvent(eventId) : null;

  const tickets = useMemo(() => (event ? buildTickets(event, searchParams) : []), [event, searchParams]);
  const totalPrice = tickets.reduce((sum, t) => sum + t.price, 0);

  const [step, setStep] = useState(1);
  const [buyer, setBuyer] = useState(emptyBuyer);
  const [payment, setPayment] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!event || tickets.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 text-center text-slate-500">
        No encontramos esa selección de entradas.{" "}
        <Link href="/" className="text-violet-600 underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const venue = findVenue(event.venueId);

  async function goToStep2() {
    if (!buyer.firstName || !buyer.lastName || !buyer.document || !buyer.email) {
      setError("Completá todos los datos del comprador.");
      return;
    }
    setError("");
    setSubmitting(true);
    await randomDelay();
    setSubmitting(false);
    setStep(2);
  }

  async function confirmPurchase(e) {
    e.preventDefault();
    if (!payment.name || !payment.number || !payment.expiry || !payment.cvv) {
      setError("Completá los datos de pago simulados.");
      return;
    }
    if (!acceptedTerms) {
      setError("Tenés que aceptar que esta es una compra simulada.");
      return;
    }
    setError("");
    setSubmitting(true);
    await randomDelay();

    const order = {
      id: generateOrderRef(),
      createdAt: new Date().toISOString(),
      event: {
        id: event.id,
        title: event.title,
        venueId: event.venueId,
        date: event.date,
        time: event.time,
      },
      buyer,
      tickets,
      totalPrice,
    };
    saveOrder(order);
    router.push(`/confirmation/${order.id}`);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <StepIndicator steps={STEPS} current={step} />

      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <BuyerForm value={buyer} onChange={setBuyer} />
              {error && <p className="text-sm text-rose-600">{error}</p>}
              <button
                type="button"
                onClick={goToStep2}
                disabled={submitting}
                className="w-full rounded-lg bg-violet-600 py-3 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-8"
              >
                Continuar al pago
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={confirmPurchase} className="space-y-4">
              <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-700">
                <ShieldAlert size={16} className="mt-0.5 shrink-0" />
                Este es un pago simulado para una demo de portfolio. No ingreses datos reales
                de tu tarjeta.
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Nombre en la tarjeta
                    </label>
                    <input
                      type="text"
                      value={payment.name}
                      onChange={(e) => setPayment({ ...payment, name: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Número (simulado)
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      value={payment.number}
                      onChange={(e) => setPayment({ ...payment, number: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Vencimiento</label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      maxLength={5}
                      value={payment.expiry}
                      onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">CVV</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      value={payment.cvv}
                      onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 accent-violet-600"
                />
                Entiendo que esta es una compra de entradas simulada, sin validez real, creada
                solo para una demo de portfolio.
              </label>

              {error && <p className="text-sm text-rose-600">{error}</p>}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={submitting}
                  className="rounded-lg border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-violet-600 py-3 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70 sm:flex-none sm:px-8"
                >
                  <Lock size={14} />
                  {submitting ? "Confirmando…" : "Confirmar compra simulada"}
                </button>
              </div>
            </form>
          )}
        </div>

        <aside className="w-full shrink-0 space-y-4 lg:w-80">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Resumen</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{event.title}</p>
            <p className="text-xs text-slate-500">
              {venue.name} · {venue.city}
            </p>
            <p className="text-xs text-slate-500">
              {formatDateLong(event.date)} · {event.time}
            </p>

            <div className="mt-3 space-y-1 border-t border-slate-100 pt-3 text-sm text-slate-600">
              {tickets.map((t, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span>{t.label}</span>
                  <span className="font-medium text-slate-800">{formatPrice(t.price)}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-sm font-medium text-slate-600">Total</span>
              <span className="text-xl font-bold text-slate-900">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
