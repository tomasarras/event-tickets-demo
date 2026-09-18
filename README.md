# Butaca 🎟️ — event-tickets-demo

Portfolio demo app: fictional event ticketing — general admission (buy by
quantity) and seated venues (numbered seats by zone) — built to showcase
frontend engineering and UI/UX. **Not a real ticketing platform.**

**⚠️ This is a demo.** Every venue, event, artist and price is fictional and
generated in the browser. There is no backend, no database, and no real
payment processing — don't enter real card numbers or personal documents.

## Why this exists

One of a handful of demo apps for [tomasarras.com.ar](https://tomasarras.com.ar),
built after [flight-booking-demo](https://github.com/tomasarras/flight-booking-demo)
to show a different kind of selection flow — general-admission quantity
picking vs. a numbered seat map — without relying on a real company's
branding or data.

## Stack

- [Next.js](https://nextjs.org/) (App Router) + React
- Tailwind CSS
- [`qrcode`](https://www.npmjs.com/package/qrcode) — generates real, scannable
  QR codes client-side for each ticket (no backend involved)
- No backend, no database — the event catalog is a static fixture, seat
  occupancy is generated deterministically per event, and "orders" are
  persisted only in the browser's `localStorage`.

## How it works

- `lib/events.js` / `lib/venues.js` — fictional event catalog and venues.
- `lib/seatZones.js` — deterministic per-event seat map (Platea/Palco/Pullman
  zones) so the same event always shows the same occupied seats.
- `lib/ticketOrders.js` — reads/writes "orders" to `localStorage`. Nothing
  ever leaves the browser.
- `components/QRTicket.js` — renders a real QR code per ticket using
  `qrcode`, purely client-side.
- `components/EventImage.js` — shows a real photo when one exists at
  `public/images/events/<event-id>.jpg` (or `public/images/hero.jpg` for the
  homepage banner), and falls back to the category color gradient otherwise.
  Drop a generated image in with the right filename and it's picked up
  automatically, no code changes needed. See `prompts.txt` for ready-to-use
  AI image-generation prompts (two style variants per event, plus the hero).

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Deployed on [Vercel](https://vercel.com). No environment variables required.
