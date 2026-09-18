import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#7c3aed",
          borderRadius: 8,
        }}
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
          <path
            fill="#fff"
            d="M20 12c0-1.1.9-2 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4c1.1 0 2 .9 2 2s-.9 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2zm-9 5.5H9v-2h2v2zm0-4.5H9v-2h2v2zm0-4.5H9v-2h2v2z"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
