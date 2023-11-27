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
  isCompleted: boolean | undefined,
  hasAssignment: boolean | undefined,
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
        hasAssignment === undefined
          ? {}
          : hasAssignment
          ? { Assignment: { some: {} } }
          : { Assignment: { none: {} } },
        isCompleted === undefined
          ? {}
          : isCompleted ? { Assignment: { some: { reviewed: "ACCEPTED" } } }
          : { Assignment: { none: { reviewed: "ACCEPTED" } } },
      ],
    },
  });
  return cs;
}
