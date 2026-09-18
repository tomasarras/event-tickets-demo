import { createRng } from "./prng";

const COLS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

function zoneForRow(row) {
  if (row <= 6) return "platea";
  if (row <= 10) return "palco";
  return "pullman";
}

// Deterministic per-event seat map: same event always shows the same
// occupied seats, no backend/database needed.
export function generateVenueSeats(eventId) {
  const rng = createRng(`seats-${eventId}`);
  const seats = [];
  for (let row = 1; row <= 14; row++) {
    for (const col of COLS) {
      seats.push({
        code: `${row}${col}`,
        row,
        zone: zoneForRow(row),
        occupied: rng() < 0.3,
      });
    }
  }
  return seats;
}

export const ZONE_LABELS = {
  platea: "Platea",
  palco: "Palco",
  pullman: "Pullman",
};

export const ZONE_COLORS = {
  platea: "#7c3aed",
  palco: "#0284c7",
  pullman: "#059669",
};
