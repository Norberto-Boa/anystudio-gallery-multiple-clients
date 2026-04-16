const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const ROOT_FOLDER_ID = import.meta.env.VITE_DRIVE_ROOT_FOLDER_ID;

const BASE_URL = "https://www.googleapis.com/drive/v3/files";

function buildUrl(params: Record<string, string>) {
  const searchParams = new URLSearchParams(params);
  return `${BASE_URL}?${searchParams.toString()}`;
}

export function getDriveGridImage(url?: string, size = 1200) {
  if (!url) return "";
  return url.replace(/=s\d+/, `=s${size}`);
}

export function getDriveGridImageHuge(url?: string, size = 2200) {
  if (!url) return "";
  return url.replace(/=s\d+/, `=s${size}`);
}

export async function listFolderContents(folderId: string) {
  const url = buildUrl({
    q: `'${folderId}' in parents and trashed = false`,
    fields: "nextPageToken,files(id,name,mimeType,thumbnailLink,webViewLink)",
    orderBy: "folder,name",
    pageSize: "250",
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
    key: API_KEY,
  });

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch folder contents: ${res}");
  }

  return res.json();
}

export async function listRootContent() {
  return listFolderContents(ROOT_FOLDER_ID);
}

export async function fetchFolderCover(folderId: string) {
  const url = buildUrl({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: "files(id,name,mimeType,thumbnailLink,webViewLink)",
    pageSize: "1",
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
    key: API_KEY,
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch folder cover: ${response.status}`);
  }

  const data = await response.json();
  return data.files?.[0] ?? null;
}

export async function getDriveItem(fileId: string) {
  const params = new URLSearchParams({
    fields:
      "id,name,mimeType,thumbnailLink,webViewLink,webContentLink,createdTime,modifiedTime",
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
    key: API_KEY,
  });

  const res = await fetch(`${BASE_URL}/${fileId}?${params.toString()}`);

  console.log(res);

  if (!res.ok) {
    throw new Error(`Failed to fetch drive item: ${res}`);
  }

  return res.json();
}
