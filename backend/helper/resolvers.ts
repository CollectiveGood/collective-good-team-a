import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
var sha1 = require("sha1");

export const catchErrors = <T extends Array<any>, U>(
  fn: (...args: T) => Promise<U | Error>
) => {
  return async (...args: T): Promise<U | Error> => {
    try {
      return await fn(...args);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return new Error("uniqueness constraint violated");
      }
    }
    return new Error("unknown error");
  };
};

export async function makeUser(name: string, password: string, email: string) {
  const user = await prisma.user.create({
    data: {
      name: name,
      password: password,
      email: email,
    },
  });
  return user;
}

export async function makeAdminUser(
  name: string,
  password: string,
  email: string
) {
  const user = await prisma.user.create({
    data: {
      name: name,
      password: password,
      email: email,
      role: "ADMIN",
    },
  });
  return user;
}

export async function addCase(id: number, path: string, altText: string) {
  const c = await prisma.case.create({
    data: {
      URLhash: sha1(path),
      url: path,
      altText: altText,
      authorId: id,
    },
  });
  return c;
}

export async function getCase(hash: string) {
  const c = await prisma.case.findFirst({ where: { URLhash: hash } });
  return c;
}

export async function getCases() {
  const cs = await prisma.case.findMany({ take: 15 });
  return cs;
}

export async function addInfo(info: any, userId: number, hash: string) {
  // Can be replaced to upsert to allow for updates
  const information = await prisma.information.create({
    data: {
      info: info,
      userId: userId,
      hash: hash,
    },
  });
  return information;
}

export async function allInfo() {
  const infos = await prisma.information.findMany({
    take: 15,
  });
  return infos;
}
