import { PrismaClient } from "@prisma/client";
import { getHash } from "../helper/resolvers";

const prisma = new PrismaClient();
async function main() {
  const adam = await prisma.user.upsert({
    where: { email: "adam@gmail.com" },
    update: {},
    create: {
      email: "adam@gmail.com",
      name: "adam",
      password: getHash("test" + "adam@gmail.com"),
      cases: {
        create: {
          URLhash: getHash("./files/BudFraWat2_fin-1.pdf"),
          url: "./files/BudFraWat2_fin-1.pdf",
          caseName: "Research Paper #1",
        },
      },
    },
  });
  const tyler = await prisma.user.upsert({
    where: { email: "tyler@gmail.com" },
    update: {},
    create: {
      email: "tyler@gmail.com",
      name: "tyler",
      password: getHash("test2" + "tyler@gmail.com"),
      cases: {
        create: [
          {
            URLhash: getHash("./files/STAT303-1_Fall2023_Syllabus.pdf"),
            url: "./files/STAT303-1_Fall2023_Syllabus.pdf",
            caseName: "Syllabus #1",
          },
        ],
      },
    },
  });
  const submission = await prisma.assignments.upsert({
    where: {
      userId_hash: {
        hash: getHash("./files/STAT303-1_Fall2023_Syllabus.pdf"),
        userId: 1,
      },
    },
    update: {},
    create: {
      info: { field1: "this is field1", field2: "this is field2" },
      userId: 1,
      hash: getHash("./files/STAT303-1_Fall2023_Syllabus.pdf"),
    },
  });

  const assignment = await prisma.assignments.upsert({
    where: {
      userId_hash: {
        hash: getHash("./files/BudFraWat2_fin-1.pdf"),
        userId: 1,
      },
    },
    update: {
      info: undefined,
    },
    create: {
      userId: 1,
      hash: getHash("./files/BudFraWat2_fin-1.pdf"),
      info: undefined,
    },
  });

  console.log({ adam, tyler, submission, assignment });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
