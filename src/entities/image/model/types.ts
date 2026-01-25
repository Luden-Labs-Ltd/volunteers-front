export interface Image {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  key: string;
  url: string;
  bucket: string;
  createdAt: string;
  updatedAt: string;
}

export interface UploadImageRequest {
  file: File;
  folder?: string;
}
