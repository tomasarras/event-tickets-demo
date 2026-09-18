"use client";

import { useEffect, useState } from "react";

// Shows a real photo when one exists at `src`; falls back to the category
// color gradient otherwise — so dropping generated images into /public
// later "just works" with no code changes.
//
// The image is preloaded in JS (rather than rendered directly as an <img>)
// so a missing file never causes a broken-image flash: a 404 on a local
// file resolves almost instantly, often before React finishes hydrating
// and attaches an onError listener to a server-rendered <img>, which would
// silently miss the error event.
export default function EventImage({
  src,
  alt = "",
  categoryColor,
  overlay = true,
  className = "",
  children,
}) {
  const [loadedSrc, setLoadedSrc] = useState(null);

  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    const img = new window.Image();
    img.onload = () => {
      if (!cancelled) setLoadedSrc(src);
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  const showImage = Boolean(loadedSrc);

  return (
    <div className={className}>
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={loadedSrc} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}cc)` }}
        />
      )}
      {overlay && showImage && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      )}
      {children && <div className="relative h-full">{children}</div>}
    </div>
  );
}
