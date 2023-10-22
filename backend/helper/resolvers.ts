import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
var sha1 = require("sha1");

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

export async function addCase(id: number, path: string, caseName: string) {
  const c = await prisma.case.create({
    data: {
      URLhash: sha1(path),
      url: path,
      caseName: caseName,
      authorId: id,
    },
  });
  return c;
}

export function getHash(path: string) {
  return sha1(path);
}

export async function getCase(hash: string) {
  const c = await prisma.case.findFirst({ where: { URLhash: hash } });
  return c;
}

export async function getCases() {
  const cs = await prisma.case.findMany({ take: 15 });
  return cs;
}

export async function upsertInfo(info: any, userId: number, hash: string) {
  // Can be replaced to upsert to allow for updates
  const information = await prisma.assignments.upsert({
    where: {
      userId_hash: { userId: userId, hash: hash },
    },
    update: {
      info: info,
    },
    create: {
      info: info,
      userId: userId,
      hash: hash,
    },
  });
  return information;
}

export async function assignCase(user: number, hash: string) {
  const c = await prisma.assignments.create({
    data: {
      userId: user,
      hash: hash,
      info: undefined,
    },
  });
  return c;
}

export async function getAssignedCases(user: number) {
  const cs = await prisma.assignments.findMany({
    include: { case: { select: { caseName: true } } },
    where: {
      userId: user,
    },
  });
  return cs;
}

export async function allInfo() {
  const infos = await prisma.assignments.findMany({
    take: 15,
  });
  return infos;
}
