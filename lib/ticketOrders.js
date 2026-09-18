// All "persistence" for this demo lives in the browser's localStorage —
// there is no backend or database, by design (see README).
const STORAGE_KEY = "butaca_orders_v1";

function isBrowser() {
  return typeof window !== "undefined";
}

export function generateOrderRef() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "";
  for (let i = 0; i < 6; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return ref;
}

export function getAllOrders() {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getOrder(id) {
  return getAllOrders().find((o) => o.id === id) || null;
}

export function saveOrder(order) {
  if (!isBrowser()) return;
  const all = getAllOrders();
  all.unshift(order);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
