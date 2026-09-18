"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock, Loader2, MapPin } from "lucide-react";
import { CATEGORIES } from "@/lib/events";
import { findVenue } from "@/lib/venues";
import { formatDateLong, formatPrice } from "@/lib/format";
import { generateVenueSeats } from "@/lib/seatZones";
import { randomDelay } from "@/lib/delay";
import BackButton from "@/components/BackButton";
import TicketTierPicker from "@/components/TicketTierPicker";
import SeatZoneMap from "@/components/SeatZoneMap";
import EventImage from "@/components/EventImage";
import { Skeleton } from "@/components/Skeleton";
import { useLanguage } from "@/components/LanguageProvider";

export default function EventDetailClient({ event }) {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const venue = findVenue(event.venueId);
  const category = CATEGORIES[event.category];

  const [quantities, setQuantities] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [continuing, setContinuing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated "fetch" of event details/availability.
    randomDelay(900, 300).then(() => setLoading(false));
  }, []);

  const seats = useMemo(() => (event.seated ? generateVenueSeats(event.id) : []), [event]);

  const totalQty = event.seated
    ? selectedSeats.length
    : Object.values(quantities).reduce((a, b) => a + b, 0);

  const totalPrice = event.seated
    ? selectedSeats.reduce((sum, code) => {
        const seat = seats.find((s) => s.code === code);
        return sum + (seat ? event.zonePrices[seat.zone] : 0);
      }, 0)
    : event.tiers.reduce((sum, t) => sum + (quantities[t.id] || 0) * t.price, 0);

  function toggleSeat(code) {
    setSelectedSeats((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  }

  async function handleContinue() {
    if (totalQty === 0) return;
    setContinuing(true);
    await randomDelay();

    const params = new URLSearchParams({ event: event.id });
    if (event.seated) {
      params.set("seats", selectedSeats.join(","));
    } else {
      const tiersParam = Object.entries(quantities)
        .filter(([, qty]) => qty > 0)
        .map(([id, qty]) => `${id}:${qty}`)
        .join(",");
      params.set("tiers", tiersParam);
    }
    router.push(`/checkout?${params.toString()}`);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 pb-28">
      <BackButton />

      <EventImage
        src={`/images/events/${event.id}.jpg`}
        alt={event.title}
        categoryColor={category.color}
        className="relative mt-4 h-40 overflow-hidden rounded-2xl"
      >
        <div className="flex h-full items-end p-6">
          <div>
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
              {t(`category_${event.category}`)}
            </span>
            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{event.title}</h1>
          </div>
        </div>
      </EventImage>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
        <span className="flex items-center gap-1.5">
          <MapPin size={15} className="text-violet-600" />
          {venue.name} · {venue.city}
        </span>
        <span className="flex items-center gap-1.5">
          <CalendarDays size={15} className="text-violet-600" />
          {formatDateLong(event.date, lang)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={15} className="text-violet-600" />
          {event.time}
        </span>
      </div>

      <p className="mt-4 text-sm text-slate-600">{event.description}</p>

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">
          {event.seated ? t("event_choose_seats") : t("event_choose_tickets")}
        </h2>
        {loading ? (
          <TicketPickerSkeleton seated={event.seated} />
        ) : event.seated ? (
          <SeatZoneMap
            seats={seats}
            zonePrices={event.zonePrices}
            selected={selectedSeats}
            onToggle={toggleSeat}
          />
        ) : (
          <TicketTierPicker
            tiers={event.tiers}
            quantities={quantities}
            onChange={(id, qty) => setQuantities((prev) => ({ ...prev, [id]: qty }))}
          />
        )}
      </div>

      {!loading && totalQty > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-6 py-3">
            <div className="text-sm text-slate-600">
              {t("event_ticket_count", totalQty)} ·{" "}
              <span className="text-lg font-bold text-slate-900">{formatPrice(totalPrice, lang)}</span>
            </div>
            <button
              type="button"
              onClick={handleContinue}
              disabled={continuing}
              className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {continuing && <Loader2 size={14} className="animate-spin" />}
              {continuing ? t("event_confirming") : t("event_continue")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TicketPickerSkeleton({ seated }) {
  if (seated) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
        <Skeleton className="mb-4 h-4 w-64" />
        <Skeleton className="mb-4 h-8 w-full rounded-md" />
        <div className="mx-auto max-w-md space-y-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="mx-auto h-5 w-64" />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {Array.from({ length: 2 }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-xl" />
      ))}
    </div>
  );
}
