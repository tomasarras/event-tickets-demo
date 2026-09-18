import Link from "next/link";
import { MapPin, CalendarDays } from "lucide-react";
import { CATEGORIES, eventMinPrice } from "@/lib/events";
import { findVenue } from "@/lib/venues";
import { formatDateShort, formatPrice } from "@/lib/format";
import { Skeleton } from "@/components/Skeleton";
import EventImage from "@/components/EventImage";

export default function EventCard({ event }) {
  const venue = findVenue(event.venueId);
  const category = CATEGORIES[event.category];

  return (
    <Link
      href={`/events/${event.id}`}
      className="group block overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-md"
    >
      <EventImage
        src={`/images/events/${event.id}.jpg`}
        alt={event.title}
        categoryColor={category.color}
        className="relative h-28 overflow-hidden"
      >
        <div className="flex h-full items-end p-4">
          <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
            {category.label}
          </span>
        </div>
      </EventImage>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 group-hover:text-violet-600">
          {event.title}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin size={13} />
          {venue.name} · {venue.city}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
          <CalendarDays size={13} />
          {formatDateShort(event.date)} · {event.time}
        </p>
        <p className="mt-3 text-sm font-semibold text-slate-900">
          Desde {formatPrice(eventMinPrice(event))}
        </p>
      </div>
    </Link>
  );
}

export function EventCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <Skeleton className="h-28 w-full rounded-none" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
}
