import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { DriveItem } from "../types/drive";
import { listFolderContents } from "../services/drive";

export function GalleryPage() {
  const { folderId = "" } = useParams();
  const [folders, setFolders] = useState<DriveItem[]>([]);
  const [images, setImages] = useState<DriveItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await listFolderContents(folderId);

        const folderItems = data.files.filter(
          (item) => item.mimeType === "application/vnd.google-apps.folder",
        );

        const imageItems = data.files.filter((item) =>
          item.mimeType.startsWith("image/"),
        );

        setFolders(folderItems);
        setImages(imageItems);
      } finally {
        setLoading(false);
      }
    }

    if (folderId) load();
  }, [folderId]);

  if (loading) return <div>Carregando galeria...</div>;

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Galeria</h1>

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
                <div className="mb-3 aspect-[4/3] rounded-xl bg-neutral-100" />
                <h3 className="font-medium">{folder.name}</h3>
              </a>
            ))}
          </div>
        </>
      )}

      <h2 className="mb-4 text-xl font-semibold">Imagens</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="overflow-hidden rounded-2xl border bg-white shadow-sm"
          >
            <img
              src={image.thumbnailLink}
              alt={image.name}
              className="aspect-square w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
