import * as Dialog from "@radix-ui/react-dialog";
import type { DriveItem } from "../types/drive";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";
import { useEffect, useRef } from "react";

interface ImagePreviewModalProps {
  images: DriveItem[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function getPreviewUrl(image: DriveItem) {
  return `https://drive.google.com/thumbnail?id=${image.id}&sz=w2200`;
}

function getDownloadUrl(image: DriveItem) {
  return `https://drive.google.com/uc?export=download&id=${image.id}`;
}

export function ImagePreviewModal({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: ImagePreviewModalProps) {
  const isOpen = currentIndex !== null;
  const image = currentIndex !== null ? images[currentIndex] : null;

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    touchStartX.current = e.changedTouches[0].clientX;
    touchEndX.current = null;
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    touchEndX.current = e.changedTouches[0].clientX;

    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 25;

    if (distance > minSwipeDistance) {
      onNext();
    } else if (distance < -minSwipeDistance) {
      onPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }

  if (!image) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />

        <Dialog.Content className="fixed inset-0 z-50 flex flex-col outline-none">
          <div className="flex items-center justify-between p-4 text-white">
            <div className="min-w-0">
              <p className="truncate text-sm md:text-base">{image.name}</p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={getDownloadUrl(image)}
                download
                target="_blank"
                rel="nonreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <Download size={20} />
              </a>

              <Dialog.Close asChild>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                  title="Fechar"
                >
                  <X size={20} />
                </button>
              </Dialog.Close>
            </div>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center px-4 pb-6"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              type="button"
              onClick={onPrev}
              className="absolute left-4 z-10 inline-flex h-12 w-12 items-cneter justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60"
            >
              <ChevronLeft size={24} />
            </button>

            <img
              src={getPreviewUrl(image)}
              alt={image.name}
              className="block max-h-[calc(100vh-96px)] max-w-[calc(100vw-120px)] rounded-xl object-contain shadow-2xl"
              referrerPolicy="no-referrer"
            />

            <button
              type="button"
              onClick={onNext}
              className="absolute right-4 z-10 inline-flex h-12 w-12 items-cneter justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
