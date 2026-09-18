import ConfirmationClient from "./ConfirmationClient";

export const metadata = {
  title: "Compra confirmada — Butaca",
};

export default async function ConfirmationPage({ params }) {
  const { orderId } = await params;
  return <ConfirmationClient orderId={orderId} />;
}
