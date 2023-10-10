export interface fileStorage {
  /*
    Returns the buffer of the file from the database ID
  */
  getFileID: (id: number) => Promise<Buffer | undefined>;
  /*
    Returns the buffer of the file from the path
  */
  getFile: (path: string) => Buffer | undefined;
  /*
    Returns the location of the file (path in this case)
   */
  uploadFile: (buffer: Buffer, filename: string) => string;
}
