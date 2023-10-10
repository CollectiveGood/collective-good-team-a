export interface fileStorage {
  getFile: () => boolean;
  uploadFile: (buffer: Buffer, filename: string) => boolean;
}
