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
        <div className="absolute inset-0 animate-pulse bg-neutral-200" />
      )}

      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`h-auto w-full transition duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${imgClassName}`}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
