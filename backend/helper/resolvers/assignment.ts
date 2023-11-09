import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
var sha256 = require("sha256");

export async function getAssignmentsAdmin(
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

export async function allInfo() {
  const infos = await prisma.assignments.findMany({
    take: 15,
  });
  return infos;
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
