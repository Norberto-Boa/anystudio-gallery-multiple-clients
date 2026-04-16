import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { DriveItem } from "../types/drive";
import {
  getDriveGridImage,
  getDriveGridImageHuge,
  getDriveItem,
  listFolderContents,
} from "../services/drive";
import { ImagePreviewModal } from "../components/ImagePreviewModal";
import { GalleryHeroHeader } from "../components/GalleryHeroHeader";
import { formatDate } from "../helpers/format-date";
import { Helmet } from "react-helmet-async";
import { GalleryImage } from "../components/GalleryImage";
import { GalleryPageSkeleton } from "../components/GalleryPageSkeleton";

export function GalleryPage() {
  const { folderId = "" } = useParams();
  const [folders, setFolders] = useState<DriveItem[]>([]);
  const [images, setImages] = useState<DriveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null,
  );
  const [currentFolder, setCurrentFolder] = useState<DriveItem | null>(null);
  const url = window.location.href;

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
          (item: any) => item.mimeType === "application/vnd.google-apps.folder",
        );

        const imageItems = contentsData.files.filter((item: any) =>
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

  if (loading) return <GalleryPageSkeleton />;

  return (
    <>
      <Helmet>
        <title>
          {currentFolder?.name ?? "Lindas Fotos"} | Anystudio Gallery
        </title>

        <meta
          name="description"
          content="Momentos Registados durante a sua cerimonia, obrigado pela sua confianca!"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={currentFolder?.name} />
        <meta
          property="og:description"
          content={
            "Momentos Registados durante a sua cerimonia, obrigado pela sua confianca!"
          }
        />
        <meta
          property="og:image"
          content={getDriveGridImageHuge(images[0].thumbnailLink)}
        />
        <meta property="og:url" content={url} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentFolder?.name} />
        <meta
          name="twitter:description"
          content={
            "Momentos Registados durante a sua cerimonia, obrigado pela sua confianca!"
          }
        />
        <meta
          name="twitter:image"
          content={getDriveGridImageHuge(images[0].thumbnailLink)}
        />
      </Helmet>
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
            {/* <h2 className="mb-4 text-xl font-semibold">Imagens</h2> */}

            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mt-8">
              {images.map((image, index) => (
                <button
                  onClick={() => handleOpenImage(index)}
                  type="button"
                  key={image.id}
                  className="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-neutral-100 shadow-sm transition hover:shadow-md"
                >
                  <GalleryImage
                    src={getDriveGridImage(image.thumbnailLink)}
                    alt={image.name}
                    className="min-h-45"
                    imgClassName="transition duration-500 group-hover:scale-[1.02]"
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
    </>
  );
}
