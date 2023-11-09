import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export async function deleteCase(hash: string) {
  const c = await prisma.case.delete({
    where: { fileName: hash },
  });
  return c;
}

export async function getCase(hash: string) {
  const c = await prisma.case.findFirst({ where: { fileName: hash } });
  return c;
}

export async function getCases(
  isCompleted: boolean,
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
        isCompleted ? { completed: true } : { completed: false },
      ],
    },
  });
  return cs;
}

export async function resolveCase(
  hash: string,
  shouldResolve: boolean,
  json: any
) {
  const c = await prisma.case.update({
    where: { fileName: hash },
    data: { completed: shouldResolve, finalJson: json },
  });
  return c;
}
