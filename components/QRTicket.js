"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function QRTicket({ value, size = 128 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, value, {
      width: size,
      margin: 1,
      color: { dark: "#0f172a", light: "#ffffff" },
    });
  }, [value, size]);

  return <canvas ref={canvasRef} width={size} height={size} className="rounded-lg" />;
}
