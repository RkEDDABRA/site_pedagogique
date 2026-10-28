import { useEffect, useState } from "react";
import { dimsFor } from "@/lib/imageDims";

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}

/**
 * Course illustration with click-to-enlarge lightbox.
 * Closes by Escape key, close button, or clicking outside the image.
 */
export function ZoomableImage({ src, alt, className, eager }: ZoomableImageProps) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomed(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [zoomed]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        {...dimsFor(src)}
        loading={eager ? "eager" : "lazy"}
        onClick={() => setZoomed(true)}
        className={`${className ?? ""} cursor-zoom-in`}
      />
      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Illustration agrandie"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 p-4 cursor-zoom-out animate-in fade-in"
          onClick={() => setZoomed(false)}
        >
          <button
            type="button"
            onClick={() => setZoomed(false)}
            className="absolute right-4 top-4 rounded-full bg-card p-2 text-foreground shadow-lg transition-transform hover:scale-110"
            aria-label="Fermer l'illustration"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
          <img
            src={src}
            alt={alt}
            className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
