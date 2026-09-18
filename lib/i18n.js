// Lightweight client-side i18n: a flat dictionary keyed by string id, each
// entry holding an `es` and `en` value (or a function for pluralized /
// interpolated strings). No routing involved — see LanguageProvider.
export const dict = {
  // Header / nav
  nav_events: { es: "Eventos", en: "Events" },
  nav_my_tickets: { es: "Mis entradas", en: "My tickets" },

  // Footer
  footer_disclaimer_title: {
    es: "Butaca es un proyecto de portfolio, no una plataforma real de venta de entradas.",
    en: "Butaca is a portfolio project, not a real ticketing platform.",
  },
  footer_disclaimer_body: {
    es: "Todos los eventos, artistas, equipos y venues son ficticios y se generan en el navegador. No se procesan pagos ni compras reales — no ingreses datos reales de tarjetas ni documentos.",
    en: "All events, artists, teams and venues are fictional and generated in the browser. No real payments or purchases are processed — don't enter real card or ID details.",
  },
  footer_made_by: { es: "Hecho por", en: "Made by" },
  footer_code_at: { es: "código en", en: "code on" },

  // Categories
  category_musica: { es: "Música", en: "Music" },
  category_teatro: { es: "Teatro", en: "Theater" },
  category_deportes: { es: "Deportes", en: "Sports" },
  category_conferencias: { es: "Conferencias", en: "Conferences" },
  category_standup: { es: "Stand Up", en: "Stand-up" },
  category_all: { es: "Todos", en: "All" },

  // Seat zones
  zone_platea: { es: "Platea", en: "Orchestra" },
  zone_palco: { es: "Palco", en: "Box" },
  zone_pullman: { es: "Pullman", en: "Balcony" },
  zone_occupied: { es: "Ocupado", en: "Occupied" },
  zone_stage: { es: "ESCENARIO", en: "STAGE" },
  seat_label: {
    es: (code, zoneLabel) => `Asiento ${code} · ${zoneLabel}`,
    en: (code, zoneLabel) => `Seat ${code} · ${zoneLabel}`,
  },

  // Home
  home_badge: {
    es: "Proyecto demo de portfolio · datos ficticios",
    en: "Portfolio demo project · fictional data",
  },
  home_title: { es: "Encontrá tu lugar", en: "Find your seat" },
  home_subtitle: {
    es: "Butaca es un catálogo de eventos ficticio construido como pieza de portfolio: recitales, teatro, deportes y conferencias inventados, sin backend ni pagos reales.",
    en: "Butaca is a fictional event catalog built as a portfolio piece: made-up concerts, theater, sports and conferences, with no backend or real payments.",
  },
  home_search_placeholder: {
    es: "Buscar por evento, venue o ciudad…",
    en: "Search by event, venue or city…",
  },
  home_card1_title: { es: "Entradas simuladas", en: "Simulated tickets" },
  home_card1_text: {
    es: "Campo general por cantidad, o asientos numerados por zona según el evento.",
    en: "General admission by quantity, or numbered seats by zone depending on the event.",
  },
  home_card2_title: { es: "Sin datos reales", en: "No real data" },
  home_card2_text: {
    es: "No se guarda información en ningún servidor: tus entradas quedan solo en tu navegador (localStorage).",
    en: "Nothing is stored on any server: your tickets stay only in your browser (localStorage).",
  },
  home_card3_title: { es: "Eventos ficticios", en: "Fictional events" },
  home_card3_text: {
    es: "Aurora Wolves, Marea Sur y demás artistas son inventados para este demo — ninguno existe en la realidad.",
    en: "Aurora Wolves, Marea Sur and the other acts are invented for this demo — none of them are real.",
  },
  home_upcoming_events: { es: "Próximos eventos", en: "Upcoming events" },
  home_no_match: {
    es: "No hay eventos que coincidan con la búsqueda.",
    en: "No events match your search.",
  },

  // Event card
  event_from_price: { es: (price) => `Desde ${price}`, en: (price) => `From ${price}` },

  // Event detail
  event_choose_seats: { es: "Elegí tus asientos", en: "Choose your seats" },
  event_choose_tickets: { es: "Elegí tus entradas", en: "Choose your tickets" },
  event_ticket_count: {
    es: (n) => `${n} entrada${n > 1 ? "s" : ""}`,
    en: (n) => `${n} ticket${n > 1 ? "s" : ""}`,
  },
  event_continue: { es: "Continuar", en: "Continue" },
  event_confirming: { es: "Confirmando…", en: "Confirming…" },
  event_not_found: { es: "No encontramos esa selección de entradas.", en: "We couldn't find that ticket selection." },

  // Common
  common_back: { es: "Volver", en: "Back" },
  common_back_to_home: { es: "Volver al inicio", en: "Back to home" },
  common_back_button: { es: "Atrás", en: "Back" },

  // Ticket tier picker
  tier_per_ticket: { es: "por entrada", en: "per ticket" },
  tier_fewer: { es: (label) => `Menos ${label}`, en: (label) => `Fewer ${label}` },
  tier_more: { es: (label) => `Más ${label}`, en: (label) => `More ${label}` },

  // Checkout
  step_buyer: { es: "Comprador", en: "Buyer" },
  step_pay: { es: "Pago", en: "Payment" },
  buyer_title: { es: "Datos del comprador", en: "Buyer details" },
  buyer_first_name: { es: "Nombre", en: "First name" },
  buyer_last_name: { es: "Apellido", en: "Last name" },
  buyer_document: { es: "Documento", en: "ID / passport" },
  buyer_email: { es: "Email", en: "Email" },
  checkout_error_buyer_fields: {
    es: "Completá todos los datos del comprador.",
    en: "Fill in all the buyer's details.",
  },
  checkout_continue_payment: { es: "Continuar al pago", en: "Continue to payment" },
  payment_disclaimer: {
    es: "Este es un pago simulado para una demo de portfolio. No ingreses datos reales de tu tarjeta.",
    en: "This is a simulated payment for a portfolio demo. Don't enter your real card details.",
  },
  payment_card_name: { es: "Nombre en la tarjeta", en: "Name on card" },
  payment_card_number: { es: "Número (simulado)", en: "Number (simulated)" },
  payment_expiry: { es: "Vencimiento", en: "Expiry" },
  payment_cvv: { es: "CVV", en: "CVV" },
  payment_terms: {
    es: "Entiendo que esta es una compra de entradas simulada, sin validez real, creada solo para una demo de portfolio.",
    en: "I understand this is a simulated ticket purchase, with no real validity, created only for a portfolio demo.",
  },
  checkout_error_payment: {
    es: "Completá los datos de pago simulados.",
    en: "Fill in the simulated payment details.",
  },
  checkout_error_terms: {
    es: "Tenés que aceptar que esta es una compra simulada.",
    en: "You need to accept that this is a simulated purchase.",
  },
  checkout_confirm: { es: "Confirmar compra simulada", en: "Confirm simulated purchase" },
  summary_title: { es: "Resumen", en: "Summary" },
  summary_total: { es: "Total", en: "Total" },

  // Confirmation
  confirmation_title: { es: "Compra simulada confirmada", en: "Simulated purchase confirmed" },
  confirmation_order_code: { es: "Código de orden", en: "Order code" },
  confirmation_document_short: { es: "Doc.", en: "ID" },
  confirmation_ticket_of: {
    es: (i, total) => `Entrada ${i} de ${total}`,
    en: (i, total) => `Ticket ${i} of ${total}`,
  },
  confirmation_total_paid: { es: "Total pagado (simulado)", en: "Total paid (simulated)" },
  confirmation_view_tickets: { es: "Ver mis entradas", en: "View my tickets" },
  confirmation_more_events: { es: "Ver más eventos", en: "See more events" },
  confirmation_not_found: {
    es: "No encontramos esta compra en este navegador.",
    en: "We couldn't find this purchase in this browser.",
  },
  confirmation_not_found_hint: {
    es: "Las compras de esta demo se guardan solo localmente y no son visibles desde otro dispositivo o navegador.",
    en: "This demo's purchases are stored locally only and aren't visible from another device or browser.",
  },

  // My tickets
  tickets_title: { es: "Mis entradas", en: "My tickets" },
  tickets_subtitle: {
    es: "Guardadas solo en este navegador — es una demo sin backend ni base de datos.",
    en: "Saved only in this browser — this is a demo with no backend or database.",
  },
  tickets_empty: { es: "Todavía no compraste ninguna entrada.", en: "You haven't bought any tickets yet." },
  tickets_see_events: { es: "Ver eventos", en: "See events" },
  tickets_order_code: {
    es: (code, count) => `Código ${code} · ${count} entrada${count > 1 ? "s" : ""}`,
    en: (code, count) => `Code ${code} · ${count} ticket${count > 1 ? "s" : ""}`,
  },
};
