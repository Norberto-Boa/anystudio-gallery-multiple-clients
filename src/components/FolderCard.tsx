import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { DriveItem } from "../types/drive";
import { fetchFolderCover } from "../services/drive";

interface FolderCardProps {
  folder: DriveItem;
}

export default function FolderCard({
  folder,
}: FolderCardProps) {
  const [cover, setCover] = useState<DriveItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadCover() {
      try {
        setLoading(true);

        const image = await fetchFolderCover(
          folder.id,
        );

        if (!active) return;

        setCover(image);
      } catch (error) {
        console.error(
          `Erro ao carregar capa de ${folder.name}`,
          error,
        );

        if (active) {
          setCover(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadCover();

    return () => {
      active = false;
    };
  }, [folder.id, folder.name]);

    const coverImageUrl = cover?.thumbnailLink
    ? cover.thumbnailLink.replace(/=s\d+/, "=s800")
    : null;

      return (
    <Link
      to={`/gallery/${folder.id}`}
      className="group block overflow-hidden rounded-xl shadow-stone-400 shadow-lg"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-zinc-100">
        {coverImageUrl ? (
          <img
            src={coverImageUrl}
            alt={folder.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : loading ? (
          <div className="h-full w-full animate-pulse bg-zinc-200" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-zinc-400">
            Sem imagem
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-black/70 px-4 py-4">
          <h2 className="truncate text-sm font-medium text-white">
            {folder.name}
          </h2>
        </div>
      </div>
    </Link>
  );
}