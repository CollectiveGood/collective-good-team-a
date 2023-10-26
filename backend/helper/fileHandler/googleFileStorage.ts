// NEED GOOGLE CLI AND https://cloud.google.com/docs/authentication/client-libraries
// https://cloud.google.com/docs/authentication/provide-credentials-adc#how-to
// gcloud auth application-default login

// Imports the Google Cloud client library
import { Storage } from "@google-cloud/storage";
import { getCase } from "../resolvers";
import { fileStorage } from "./fileStorage";
const { randomBytes } = require("node:crypto");

const storage = new Storage({
  projectId: "150959018727",
  keyFilename: ".key",
});

const bucketName = "collective-good-cases";

export class googleFileStorage implements fileStorage {
  getFileID = async (hash: string) => {
    const c = await getCase(hash);
    if (c === null) {
      return undefined;
    }
    const buffer = await this.getFile(c.fileName);
    return buffer;
  };

  getFile = async (path: string) => {
    const file = await storage.bucket(bucketName).file(path).download();
    return file[0];
  };

  uploadFile = async (buffer: Buffer) => {
    const id: string = randomBytes(20).toString("hex");

    const file = storage.bucket(bucketName).file(id);
    await file.save(buffer);
    return id;
  };

  deleteAll = async () => {
    const allFiles = await storage.bucket(bucketName).getFiles();
    for (const file of allFiles[0]) {
      file.delete();
    }
    return true;
  };
}
