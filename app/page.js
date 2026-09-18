"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, ShieldCheck, Sparkles, Ticket } from "lucide-react";
import EventCard, { EventCardSkeleton } from "@/components/EventCard";
import EventImage from "@/components/EventImage";
import CategoryFilter from "@/components/CategoryFilter";
import { EVENTS } from "@/lib/events";
import { findVenue } from "@/lib/venues";
import { randomDelay } from "@/lib/delay";
import { useLanguage } from "@/components/LanguageProvider";

export default function HomePage() {
  const { t } = useLanguage();
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [loadingCatalog, setLoadingCatalog] = useState(true);

  useEffect(() => {
    // Simulated "fetch" so the catalog doesn't feel like a static fixture.
    randomDelay(1100, 400).then(() => setLoadingCatalog(false));
  }, []);

  const events = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EVENTS.filter((e) => {
      if (category !== "all" && e.category !== category) return false;
      if (!q) return true;
      const venue = findVenue(e.venueId);
      return (
        e.title.toLowerCase().includes(q) ||
        venue.name.toLowerCase().includes(q) ||
        venue.city.toLowerCase().includes(q)
      );
    }).sort((a, b) => a.date.localeCompare(b.date));
  }, [category, query]);

  return (
    <div>
      <section className="relative overflow-hidden bg-slate-950">
        <EventImage
          src="/images/hero.jpg"
          categoryColor="#3b0764"
          overlay={false}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.35),_transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-24 text-center text-white">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
            <Sparkles size={12} />
            {t("home_badge")}
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">{t("home_title")}</h1>
          <p className="mt-2 text-slate-300 max-w-xl mx-auto">{t("home_subtitle")}</p>
        </div>
      </section>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 -mt-12 pb-16">
        <div className="rounded-2xl bg-white p-4 sm:p-5 shadow-lg shadow-slate-900/5 ring-1 ring-slate-200">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("home_search_placeholder")}
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>
          <div className="mt-3">
            <CategoryFilter value={category} onChange={setCategory} />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <InfoCard icon={<Ticket size={18} />} title={t("home_card1_title")} text={t("home_card1_text")} />
          <InfoCard
            icon={<ShieldCheck size={18} />}
            title={t("home_card2_title")}
            text={t("home_card2_text")}
          />
          <InfoCard
            icon={<Sparkles size={18} />}
            title={t("home_card3_title")}
            text={t("home_card3_text")}
          />
        </div>

        <div className="mt-12">
          <h2 className="text-lg font-semibold text-slate-900">
            {t("home_upcoming_events")}
            {!loadingCatalog && (
              <span className="ml-2 text-sm font-normal text-slate-400">({events.length})</span>
            )}
          </h2>
          {loadingCatalog ? (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
            </div>
          ) : events.length === 0 ? (
            <p className="mt-4 rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
              {t("home_no_match")}
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
        {icon}
      </span>
      <p className="mt-3 text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{text}</p>
    </div>
  );
}
