var sha256 = require("sha256");

export function getHash(path: string) {
  return sha256(path);
}
