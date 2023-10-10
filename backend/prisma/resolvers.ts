import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export async function addCase(id: number, path: string) {
  const c = await prisma.case.create({
    data: {
      url: path,
      altText: "this is a pdf",
      authorId: id,
    },
  });
  return c;
}

export async function getCase(id: number) {
  const c = await prisma.case.findFirst({ where: { id: id } });
  return c;
}

export async function getCases() {
  const cs = await prisma.case.findMany({ take: 15 });
  return cs;
}
