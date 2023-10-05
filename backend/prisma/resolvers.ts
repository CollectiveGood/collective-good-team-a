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
