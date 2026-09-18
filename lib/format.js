const LOCALES = { es: "es-AR", en: "en-US" };

export function formatPrice(usd, lang = "es") {
  return `USD ${usd.toLocaleString(LOCALES[lang] || LOCALES.es)}`;
}

export function formatDateLong(dateStr, lang = "es") {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString(LOCALES[lang] || LOCALES.es, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateShort(dateStr, lang = "es") {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString(LOCALES[lang] || LOCALES.es, { day: "2-digit", month: "short" });
}

export function addDaysISO(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}
