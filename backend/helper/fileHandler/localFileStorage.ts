import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { getCase } from "../resolvers";
import { fileStorage } from "./fileStorage";
export class localFileStorage implements fileStorage {
  getFileID = async (hash: string) => {
    const c = await getCase(hash);
    if (c === null) {
      return undefined;
    }
    const buffer = this.getFile(c.url);
    return buffer;
  };

  getFile = (path: string) => {
    if (!existsSync(path)) {
      return undefined;
    }
    return readFileSync(path);
  };

  uploadFile = (buffer: Buffer, fileName: string) => {
    const path = "./files/" + fileName;
    if (!existsSync("./files")) {
      mkdirSync("./files");
    }
    writeFileSync(path, buffer);
    return path;
  };
}