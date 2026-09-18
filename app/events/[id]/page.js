import { notFound } from "next/navigation";
import { findEvent } from "@/lib/events";
import EventDetailClient from "./EventDetailClient";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const event = findEvent(id);
  if (!event) return { title: "Evento no encontrado — Butaca" };
  return { title: `${event.title} — Butaca` };
}

export default async function EventDetailPage({ params }) {
  const { id } = await params;
  const event = findEvent(id);
  if (!event) notFound();

  return <EventDetailClient event={event} />;
}
