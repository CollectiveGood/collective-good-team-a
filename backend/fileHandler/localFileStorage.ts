import { existsSync, mkdirSync, writeFileSync } from "fs";
import { fileStorage } from "./fileStorage";
export class localFileStorage implements fileStorage {
  getFile = () => {
    // writeFile()
    return false;
  };

  uploadFile = (buffer: Buffer, fileName: string) => {
    const path = "./files/" + fileName;
    if (!existsSync("./files")) {
      mkdirSync("./files");
    }
    writeFileSync(path, buffer);
    return true;
  };
}
