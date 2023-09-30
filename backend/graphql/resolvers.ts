import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const resolvers = {
  Query: {
    allUsers: () => {
      return prisma.user.findMany();
    },
  },

  Mutation: {
    createUser: (name: string, email: string, password: string) => {
      return prisma.user.create({
        data: {
          email: email,
          name: name,
          password: password,
        },
      });
    },
  },
};
