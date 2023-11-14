import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAssignmentsAdmin(
  includeNotCompleted: boolean,
  includeReviewed: boolean,
  start: number,
  take: number,
  desc: boolean,
  hash: string | undefined
) {
  const assignments = await prisma.assignment.findMany({
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
  const infos = await prisma.assignment.findMany({
    take: 15,
  });
  return infos;
}

export async function updateAssignment(
  info: any,
  caseId: string,
  completed: boolean
) {
  const c = await prisma.assignment.update({
    where: {
      hash: caseId,
    },
    data: {
      info: info,
      completed: completed,
      reviewed: completed ? "PENDING" : {},
    },
  });
  return c;
}

export async function resolveAssignment(caseId: string, resolved: boolean) {
  const c = await prisma.assignment.update({
    where: {
      hash: caseId,
    },
    data: { reviewed: resolved ? "ACCEPTED" : "REJECTED" },
  });
  return c;
}

export async function assignCase(user: number, reviewer: number, hash: string) {
  const c = await prisma.assignment.create({
    data: {
      userId: user,
      reviewerId: reviewer,
      hash: hash,
      info: undefined,
    },
  });
  return c;
}

export async function getAssignedCases(user: number) {
  const cs = await prisma.assignment.findMany({
    include: { case: { select: { caseName: true } } },
    where: {
      userId: user,
    },
  });
  return cs;
}

export async function getReviewerCases(reviewer: number) {
  const cs = await prisma.assignment.findMany({
    include: { case: { select: { caseName: true } } },
    where: {
      reviewerId: reviewer,
    },
  });
  return cs;
}
