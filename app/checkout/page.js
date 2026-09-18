import { Suspense } from "react";
import CheckoutFlow from "./CheckoutFlow";

export const metadata = {
  title: "Finalizar compra — Butaca",
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 text-slate-400">Cargando…</div>}>
      <CheckoutFlow />
    </Suspense>
  );
}
