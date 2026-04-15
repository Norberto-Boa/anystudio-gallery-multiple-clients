export type DriveItemType = "folder" | "image";

export interface DriveItem {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webViewLink?: string;
}

export interface FolderContentsResponse {
  files: DriveItem[];
  nextPageToken?: string;
}
