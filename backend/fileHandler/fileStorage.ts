export interface fileStorage {
  getFile: () => boolean;
  // returns the url it is uploaded at
  uploadFile: (buffer: Buffer, filename: string) => string;
}
