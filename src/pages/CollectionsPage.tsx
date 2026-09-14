import { useEffect, useState } from "react";
import type { DriveItem } from "../types/drive";
import { listRootContent } from "../services/drive";
import { Link } from "react-router-dom";
import FolderCard from "../components/FolderCard";

export function CollectionsPage() {
  const [items, setItems] = useState<DriveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);


        const data = await listRootContent();

        const folders = data.files.filter(
          (item: any) => item.mimeType === "application/vnd.google-apps.folder",
        );

        setItems(folders);
      } catch (err) {
        console.log(err);
        setError("Error ao carregar colecoes.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-450 px-4 py-6">
        <p className="text-zinc-500">
          Carregando coleções...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-450 px-4 py-6">
        <p className="text-red-500">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-450 px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Coleções</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {items.map((folder) => (
          <FolderCard 
            key={folder.id}
            folder={folder}
          />
        ))}
      </div>
    </div>
  );
}
