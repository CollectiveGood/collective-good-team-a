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
    select: { Assignment: { select: { completed: true, reviewed: true } } },
    orderBy: { createdAt: desc ? "desc" : "asc" },
    skip: start,
    take: take,
    where: {
      AND: [
        hasAssignment === undefined
          ? {}
          : hasAssignment
          ? { Assignment: { isNot: null } }
          : { Assignment: { is: null } },
        isCompleted === undefined
          ? {}
          : { Assignment: { completed: isCompleted } },
      ],
    },
  });
  return cs;
}
