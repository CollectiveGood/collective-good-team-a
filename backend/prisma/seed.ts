import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { googleFileStorage } from "../helper/fileHandler/googleFileStorage";
import { getHash } from "../helper/resolvers";

const fileHandler = new googleFileStorage();
const prisma = new PrismaClient();

async function main() {
  const file1 = "./files/BudFraWat2_fin-1.pdf";
  const hash1 = await fileHandler.uploadFile(readFileSync(file1));
  const file2 = "./files/STAT303-1_Fall2023_Syllabus.pdf";
  const hash2 = await fileHandler.uploadFile(readFileSync(file2));

  const adam = await prisma.user.upsert({
    where: { email: "adam@gmail.com" },
    update: {},
    create: {
      email: "adam@gmail.com",
      name: "adam",
      password: getHash("test" + "adam@gmail.com"),
      cases: {
        create: {
          URLhash: getHash(hash1),
          url: hash1,
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
            URLhash: getHash(hash2),
            url: hash2,
            caseName: "Syllabus #1",
          },
        ],
      },
    },
  });
  const submission = await prisma.assignments.upsert({
    where: {
      userId_hash: {
        hash: getHash(hash2),
        userId: 1,
      },
    },
    update: {},
    create: {
      info: { field1: "this is field1", field2: "this is field2" },
      userId: 1,
      hash: getHash(hash2),
    },
  });

  const assignment = await prisma.assignments.upsert({
    where: {
      userId_hash: {
        hash: getHash(hash1),
        userId: 1,
      },
    },
    update: {
      info: undefined,
    },
    create: {
      userId: 1,
      hash: getHash(hash1),
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
