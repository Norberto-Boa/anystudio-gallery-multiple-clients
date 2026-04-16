import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { DriveItem } from "../types/drive";
import {
  getDriveGridImage,
  getDriveItem,
  listFolderContents,
} from "../services/drive";
import { ImagePreviewModal } from "../components/ImagePreviewModal";
import { GalleryHeroHeader } from "../components/GalleryHeroHeader";
import { formatDate } from "../helpers/format-date";

export function GalleryPage() {
  const { folderId = "" } = useParams();
  const [folders, setFolders] = useState<DriveItem[]>([]);
  const [images, setImages] = useState<DriveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null,
  );
  const [currentFolder, setCurrentFolder] = useState<DriveItem | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [folderData, contentsData] = await Promise.all([
          getDriveItem(folderId),
          listFolderContents(folderId),
        ]);

        setCurrentFolder(folderData);

        const folderItems = contentsData.files.filter(
          (item) => item.mimeType === "application/vnd.google-apps.folder",
        );

        const imageItems = contentsData.files.filter((item) =>
          item.mimeType.startsWith("image/"),
        );

        setFolders(folderItems);
        setImages(imageItems);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (folderId) load();
  }, [folderId]);

  function handleOpenImage(index: number) {
    setCurrentImageIndex(index);
  }

  function handleCloseModal() {
    setCurrentImageIndex(null);
  }

  function handlePrevImage() {
    setCurrentImageIndex((prev) => {
      if (prev === null || images.length === 0) return prev;
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  }

  function handleNextImage() {
    setCurrentImageIndex((prev) => {
      if (prev === null || images.length === 0) return prev;
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  }

  if (loading) return <div>Carregando galeria...</div>;

  return (
    <div className="mx-auto max-w-7xl p-6">
      {images.length > 0 ? (
        <GalleryHeroHeader
          title={currentFolder?.name || "Um lindo album"}
          coverUrl={images[0].thumbnailLink}
          date={formatDate(currentFolder?.createdTime)}
        />
      ) : (
        <h1 className="mb-6 text-3xl font-bold">Galeria</h1>
      )}

      {folders.length > 0 && (
        <>
          <h2 className="mb-4 text-xl font-semibold">Subpastas</h2>
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {folders.map((folder) => (
              <a
                key={folder.id}
                href={`/gallery/${folder.id}`}
                className="rounded-2xl border p-4 shadow-sm"
              >
                <div className="mb-3 aspect-4/3 rounded-xl bg-neutral-100" />
                <h3 className="font-medium">{folder.name}</h3>
              </a>
            ))}
          </div>
        </>
      )}

      {images.length > 0 && (
        <>
          <h2 className="mb-4 text-xl font-semibold">Imagens</h2>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((image, index) => (
              <button
                onClick={() => handleOpenImage(index)}
                type="button"
                key={image.id}
                className="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-neutral-100 shadow-sm transition hover:shadow-md"
              >
                <img
                  src={getDriveGridImage(image.thumbnailLink)}
                  alt={image.name}
                  className="h-auto w-full object-cover transition duration-300 hover:scale-[1.02]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </>
      )}

      <ImagePreviewModal
        images={images}
        currentIndex={currentImageIndex}
        onClose={handleCloseModal}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
      />
    </div>
  );
}
