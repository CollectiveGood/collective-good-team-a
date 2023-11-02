import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
var sha256 = require("sha256");

export async function makeUser(name: string, password: string, email: string) {
  const user = await prisma.user.create({
    data: {
      name: name,
      password: sha256(password + email),
      email: email,
    },
  });
  return user;
}

export async function updateUser(
  id: number,
  name: string,
  password: string,
  email: string
) {
  const user = await prisma.user.update({
    where: { id: id },
    data: {
      name: name,
      password: sha256(password + email),
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
      password: sha256(password + email),
      email: email,
      role: "ADMIN",
    },
  });
  return user;
}

export function getHash(path: string) {
  return sha256(path);
}

export async function addCase(id: number, path: string, caseName: string) {
  const c = await prisma.case.create({
    data: {
      fileName: path,
      caseName: caseName,
      authorId: id,
    },
  });
  return c;
}

export async function getCase(hash: string) {
  const c = await prisma.case.findFirst({ where: { fileName: hash } });
  return c;
}

export async function getCases() {
  const cs = await prisma.case.findMany({ take: 15 });
  return cs;
}

export async function getCasesDetailed(
  // isCompleted: boolean,
  hasAssignments: boolean,
  start: number,
  take: number,
  desc: boolean
) {
  const cs = await prisma.case.findMany({
    orderBy: { createdAt: desc ? "desc" : "asc" },
    skip: start,
    take: take,
    where: {
      AND: [
        hasAssignments
          ? { Assignments: { some: {} } }
          : { Assignments: { none: {} } },
        // isCompleted
        // ? { finalJson: { not: {} } }
        // : { NOT: { finalJson: { not: { modelName: null } } } },
      ],
    },
  });
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

export async function updateAssignment(
  info: any,
  userId: number,
  caseId: string,
  completed: boolean
) {
  const c = await prisma.assignments.update({
    where: {
      userId_hash: { hash: caseId, userId: userId },
    },
    data: { info: info, completed: completed },
  });
  return c;
}

export async function resolveAssignment(
  userId: number,
  caseId: string,
  resolved: boolean
) {
  const c = await prisma.assignments.update({
    where: {
      userId_hash: { hash: caseId, userId: userId },
    },
    data: { reviewed: resolved ? "ACCEPTED" : "REJECTED" },
  });
  return c;
}

export async function getCasesAdmin(
  includeNotCompleted: boolean,
  includeReviewed: boolean,
  start: number,
  take: number,
  desc: boolean,
  hash: string | undefined
) {
  const assignments = await prisma.assignments.findMany({
    orderBy: { lastUpdated: desc ? "desc" : "asc" },
    skip: start,
    take: take,
    include: { case: { select: { caseName: true } } },

    where: {
      AND: [
        { OR: [{ completed: true }, { completed: !includeNotCompleted }] },
        {
          OR: [
            { reviewed: "PENDING" },
            includeReviewed ? { reviewed: "ACCEPTED" } : {},
            includeReviewed ? { reviewed: "REJECTED" } : {},
          ],
        },
        hash ? { hash: hash } : {},
      ],
    },
  });
  return assignments;
}

export async function getUsers(
  includeAdmins: boolean,
  email: string | undefined,
  start: number,
  take: number,
  desc: boolean
) {
  return await prisma.user.findMany({
    orderBy: { id: desc ? "desc" : "asc" },
    skip: start,
    take: take,
    where: {
      AND: [
        { OR: [{ role: "USER" }, includeAdmins ? { role: "ADMIN" } : {}] },
        email ? { email: email } : {},
      ],
    },
  });
}

export async function allInfo() {
  const infos = await prisma.assignments.findMany({
    take: 15,
  });
  return infos;
}
