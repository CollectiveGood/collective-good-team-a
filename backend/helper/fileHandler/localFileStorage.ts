import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { getCase } from "../resolvers/case";
import { fileStorage } from "./fileStorage";
const { randomBytes } = require("node:crypto");

export class localFileStorage implements fileStorage {
  getFileID = async (hash: string) => {
    const c = await getCase(hash);
    if (c === null) {
      return undefined;
    }
    const buffer = await this.getFile(c.fileName);
    return buffer;
  };

  getFile = async (path: string) => {
    if (!existsSync(path)) {
      return undefined;
    }
    return readFileSync(path);
  };

  uploadFile = async (buffer: Buffer) => {
    const id: string = randomBytes(20).toString("hex");

    const path = "./files/" + id;
    if (!existsSync("./files")) {
      mkdirSync("./files");
    }
    writeFileSync(path, buffer);
    return path;
  };
}
