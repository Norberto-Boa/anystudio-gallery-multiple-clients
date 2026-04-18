import { useState } from "react";

interface GalleryImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  onClick?: () => void;
}

export function GalleryImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  onClick,
}: GalleryImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={onClick}>
      {!loaded && (
        <div className="absolute inset-0 z-10 overflow-hidden">
          <div className="absolute inset-0 bg-neutral-200" />
          <div className="absolute inset-0 animate-shimmer bg-linear-to-t from-transparent via-white/40 to-transparent" />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`relative z-20 h-auto w-full transition duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${imgClassName}`}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
