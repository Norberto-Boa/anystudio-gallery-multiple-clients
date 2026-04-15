import { useEffect, useState } from "react";
import type { DriveItem } from "../types/drive";
import { listRootContent } from "../services/drive";
import { Link } from "react-router-dom";

export function CollectionsPage() {
  const [items, setItems] = useState<DriveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        console.log("executing");

        const data = await listRootContent();
        const folders = data.files.filter(
          (item) => item.mimeType === "application/vnd.google-apps.folder",
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

  if (loading) return <div>Carregando colecoes...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Coleções</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((folder) => (
          <Link
            key={folder.id}
            to={`/gallery/${folder.id}`}
            className="rounded-2xl border p-4 shadow-sm transition hover:shadow-md"
          >
            <div className="mb-3 aspect-[4/3] rounded-xl bg-neutral-100" />
            <h2 className="font-semibold">{folder.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
