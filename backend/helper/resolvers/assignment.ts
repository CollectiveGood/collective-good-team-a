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
  userId: number,
  completed: boolean
) {

  let json: string;
  if (typeof info === "string" ) {
    json = info;
  } else {
    json = JSON.stringify(info);
  }

  const c = await prisma.assignment.update({
    where: {
      hash_userId: { hash: caseId, userId: userId },
    },
    data: {
      ...{
        info: json,
        completed: completed,
      },
      ...(completed ? { reviewed: "PENDING", review: undefined } : {}),
    },
  });
  return c;
}

export async function resolveAssignment(
  review: any,
  caseId: string,
  reviewerId: number,
  resolved: boolean | undefined
) {

  let json: string;
  if (typeof review === "string" ) {
    json = review;
  } else {
    json = JSON.stringify(review);
  }

  const c = await prisma.assignment.update({
    where: {
      hash_reviewerId: { hash: caseId, reviewerId: reviewerId },
    },
    data: {
      ...{ review: json },
      ...(resolved !== undefined
        ? { reviewed: resolved ? "ACCEPTED" : "REJECTED" }
        : {}),
    },
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

export async function getAssignment(hash: string, userId: number) {
  const c = await prisma.assignment.findUnique({
    include: { case: { select: { caseName: true } } },
    where: {
      hash_userId: { hash: hash, userId: userId },
    },
  });
  console.log(c);
  const assignment = {...c!, info: JSON.parse(c!.info), review: JSON.parse(c!.review)};

  return assignment;
}

export async function getAssignmentByID(id: number) {
  const c = await prisma.assignment.findUnique({
    include: { case: { select: { caseName: true } } },
    where: {
      id: id,
    },
  });
  const assignment = {...c!, info: JSON.parse(c!.info), review: JSON.parse(c!.review)};

  return assignment;
}

export async function getCompletedAssignments() {
  const assignments = await prisma.assignment.findMany({
    include: { case: { select: { caseName: true } } },
    where: {
      completed: true,
      reviewed: "ACCEPTED",
    }
  });

  return assignments;
}

export async function getReview(hash: string, reviewerId: number) {
  const c = await prisma.assignment.findUnique({
    include: { case: { select: { caseName: true } } },
    where: {
      hash_reviewerId: { hash: hash, reviewerId: reviewerId },
    },
  });
  const assignment = {...c!, info: JSON.parse(c!.info), review: JSON.parse(c!.review)};
  return assignment;
}

export async function getAssignedCases(user: number) {
  const cs = await prisma.assignment.findMany({
    include: { case: { select: { caseName: true, } } },
    where: {
      userId: user,
    },
  });
  const assignments = cs.map((c) => {
    return {...c, info: JSON.parse(c.info), review: JSON.parse(c.review)};
  });
  return assignments;
}

export async function getReviewerCases(reviewer: number) {
  const cs = await prisma.assignment.findMany({
    include: { case: { select: { caseName: true } } },
    where: {
      completed: true,
      reviewerId: reviewer,
    },
  });
  const assignments = cs.map((c) => {
    return {...c, info: JSON.parse(c.info), review: JSON.parse(c.review)};
  });
  return assignments;
}

export async function deleteAssignment(id: number) {
  const existingAssignment = await prisma.assignment.findUnique({
    where: { id: id },
  });

  if (!existingAssignment) {
    return null;
  }

  const deletedAssignment = await prisma.assignment.delete({
    where: { id: id },
  });

  return deletedAssignment;
}
