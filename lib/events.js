import { addDaysISO } from "./format";

// Entirely fictional events/acts — names, teams and shows invented for this
// demo. Any resemblance to real artists, teams or productions is coincidence.
export const CATEGORIES = {
  musica: { label: "Música", color: "#7c3aed" },
  teatro: { label: "Teatro", color: "#d97706" },
  deportes: { label: "Deportes", color: "#059669" },
  conferencias: { label: "Conferencias", color: "#0284c7" },
  standup: { label: "Stand Up", color: "#e11d48" },
};

export const EVENTS = [
  {
    id: "aurora-wolves-estadio-sur",
    title: "Aurora Wolves — Gira 2026",
    category: "musica",
    venueId: "estadio-sur",
    date: addDaysISO(21),
    time: "21:00",
    seated: false,
    tiers: [
      { id: "general", label: "Campo General", price: 80 },
      { id: "vip", label: "Campo VIP", price: 150 },
    ],
    description:
      "Aurora Wolves presenta su gira 2026 con un show de rock en formato estadio, con banda invitada.",
  },
  {
    id: "marea-sur-unplugged",
    title: "Marea Sur — Unplugged",
    category: "musica",
    venueId: "teatro-aurora",
    date: addDaysISO(14),
    time: "20:30",
    seated: true,
    zonePrices: { platea: 60, palco: 45, pullman: 30 },
    description: "Una noche acústica e íntima de Marea Sur, con butaca numerada.",
  },
  {
    id: "neon-static-tour",
    title: "Neon Static — Synth Tour",
    category: "musica",
    venueId: "arena-norte",
    date: addDaysISO(35),
    time: "22:00",
    seated: false,
    tiers: [
      { id: "general", label: "Campo General", price: 70 },
      { id: "vip", label: "Campo VIP", price: 130 },
    ],
    description: "Set electrónico en vivo con visuales inmersivos, en formato arena.",
  },
  {
    id: "rio-abierto-ultimas-luces",
    title: 'Río Abierto — "Últimas Luces"',
    category: "teatro",
    venueId: "teatro-aurora",
    date: addDaysISO(10),
    time: "20:00",
    seated: true,
    zonePrices: { platea: 40, palco: 30, pullman: 20 },
    description: "Nueva obra de la compañía Río Abierto. Drama contemporáneo, 90 minutos sin intervalo.",
  },
  {
    id: "vortice-vs-atletico-aurora",
    title: "Vórtice FC vs. Atlético Aurora",
    category: "deportes",
    venueId: "estadio-sur",
    date: addDaysISO(7),
    time: "17:00",
    seated: false,
    tiers: [
      { id: "popular", label: "Popular", price: 25 },
      { id: "platea", label: "Platea", price: 60 },
    ],
    description: "Clásico ficticio de la liga local. Apertura de puertas dos horas antes.",
  },
  {
    id: "diego-ramal-en-vivo",
    title: "Diego Ramal — En Vivo",
    category: "standup",
    venueId: "club-marea",
    date: addDaysISO(5),
    time: "21:30",
    seated: false,
    tiers: [{ id: "general", label: "Entrada General", price: 35 }],
    description: "Stand up de humor observacional. Apto para mayores de 16 años.",
  },
  {
    id: "congreso-latintech-2026",
    title: "Congreso LatinTech 2026",
    category: "conferencias",
    venueId: "centro-pacifico",
    date: addDaysISO(45),
    time: "09:00",
    seated: false,
    tiers: [
      { id: "general", label: "General", price: 60 },
      { id: "premium", label: "Premium", price: 110 },
      { id: "vip", label: "VIP + Networking", price: 180 },
    ],
    description: "Dos días de charlas sobre tecnología y producto, con espacio de networking.",
  },
  {
    id: "festival-marea-lago",
    title: "Festival Marea — Edición Lago",
    category: "musica",
    venueId: "anfiteatro-lago",
    date: addDaysISO(60),
    time: "16:00",
    seated: false,
    tiers: [
      { id: "campo", label: "Campo", price: 90 },
      { id: "vip", label: "VIP", price: 160 },
    ],
    description: "Festival de un día al aire libre con line-up de varios artistas ficticios.",
  },
  {
    id: "noche-de-improvisacion",
    title: "Noche de Improvisación",
    category: "teatro",
    venueId: "club-marea",
    date: addDaysISO(3),
    time: "21:00",
    seated: true,
    zonePrices: { platea: 25, palco: 20, pullman: 15 },
    description: "Improvisación teatral sobre pedidos del público, formato café concert.",
  },
];

export function findEvent(id) {
  return EVENTS.find((e) => e.id === id) || null;
}

export function eventMinPrice(event) {
  return event.seated
    ? Math.min(...Object.values(event.zonePrices))
    : Math.min(...event.tiers.map((t) => t.price));
}
