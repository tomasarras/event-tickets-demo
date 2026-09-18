// Fictional venues invented for this demo — no real stadium, theater or
// company names/branding involved.
export const VENUES = [
  { id: "estadio-sur", name: "Estadio Sur", city: "Buenos Aires" },
  { id: "teatro-aurora", name: "Teatro Aurora", city: "Buenos Aires" },
  { id: "arena-norte", name: "Arena Norte", city: "Córdoba" },
  { id: "anfiteatro-lago", name: "Anfiteatro del Lago", city: "Bariloche" },
  { id: "centro-pacifico", name: "Centro de Convenciones Pacífico", city: "Mendoza" },
  { id: "club-marea", name: "Club Marea", city: "Rosario" },
];

export function findVenue(id) {
  return VENUES.find((v) => v.id === id) || null;
}
