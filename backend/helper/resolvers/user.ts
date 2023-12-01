import { PrismaClient, Role } from "@prisma/client";
import { getHash } from "./misc";

const prisma = new PrismaClient();

export async function makeUser(name: string, password: string, email: string) {
  const user = await prisma.user.create({
    data: {
      name: name,
      password: getHash(password + email),
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
      password: getHash(password + email),
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
      password: getHash(password + email),
      email: email,
      role: "ADMIN",
    },
  });
  return user;
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

export async function getIdFromEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: { email: email },
  });
  return user?.id;
}

export async function updateUserRole(id: number, roleString: string) {
  const normalizedRole = roleString.toUpperCase() as Role;

  // Check if the normalizedRole is a valid enum value
  if (!(normalizedRole in Role)) {
    throw new Error(`Invalid role: ${roleString}`);
  }

  const user = await prisma.user.update({
    where: { id: id },
    data: { role: normalizedRole }
  });

  return user;
}
