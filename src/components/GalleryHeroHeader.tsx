import { getDriveGridImageHuge } from "../services/drive";

interface GalleryHeroHeaderProps {
  title: string;
  date?: string;
  coverUrl?: string;
}

export function GalleryHeroHeader({
  title,
  coverUrl,
  date,
}: GalleryHeroHeaderProps) {
  return (
    <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden max-w-7xl rounded-3xl">
      <div className="relative h-[40vh] min-h-80 w-full">
        {coverUrl ? (
          <img
            src={getDriveGridImageHuge(coverUrl)}
            alt={title}
            className="absolute inset-0 h-auto w-full object-fit"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-zinc-800 to-black " />
        )}

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="mx-auto mx-w-7xl px-6 pb-10 md:px-10 md:pb-14">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-white/75">
              Galeria
            </p>

            <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
              {title}
            </h1>

            <p className="mt-4 text-sm text-white/80 md:text-base">{date}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
