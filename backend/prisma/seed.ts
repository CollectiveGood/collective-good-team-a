import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { readFileSync } from "fs";
import { googleFileStorage } from "../helper/fileHandler/googleFileStorage";
import {
  assignCase,
  resolveAssignment,
  updateAssignment,
} from "../helper/resolvers/assignment";
import { addCase } from "../helper/resolvers/case";
import { makeAdminUser, makeUser } from "../helper/resolvers/user";

const fileHandler = new googleFileStorage();

export async function seedDatabase(prisma: PrismaClient) {
  // await fileHandler.deleteAll();
  const file1 = "./files/BudFraWat2_fin-1.pdf";
  const hash1 = await fileHandler.uploadFile(readFileSync(file1));
  const file2 = "./files/STAT303-1_Fall2023_Syllabus.pdf";
  const hash2 = await fileHandler.uploadFile(readFileSync(file2));
  const file3 = "./files/a.pdf";
  const hash3 = await fileHandler.uploadFile(readFileSync(file3));
  const file4 = "./files/MATH_HW_15.pdf";
  const hash4 = await fileHandler.uploadFile(readFileSync(file4));

  const adam = await makeUser("adam", "test", "adam@gmail.com");
  const tyler = await makeUser("tyler", "test1", "tyler@gmail.com");
  const admin = await makeAdminUser("admin", "admin", "admin@gmail.com");
  const case1 = await addCase(admin.id, hash1, "Research Paper #1");
  const case2 = await addCase(admin.id, hash2, "Syllabus #1");
  const case3 = await addCase(admin.id, hash3, "Transcript #1");
  const case4 = await addCase(admin.id, hash4, "MATH HW #1");

  await assignCase(adam.id, tyler.id, hash1);
  await assignCase(tyler.id, adam.id, hash2);
  await assignCase(adam.id, admin.id, hash3);
  await assignCase(tyler.id, admin.id, hash1);

  const unsubmittedCase = await updateAssignment(
    { field1: "this is field1", field2: "this is field2" },
    hash1,
    adam.id,
    false
  );
  const submittedCase = await updateAssignment(
    { field1: "this is a submittedCase case" },
    hash2,
    tyler.id,
    true
  );
  const submittedCase2 = await updateAssignment(
    { field1: "this is the final submission" },
    hash3,
    adam.id,
    true
  );

  const submittedCase3 = await updateAssignment(
    { field1: "this is assigned to admin" },
    hash1,
    tyler.id,
    true
  );

  const resolvedAssignment = await resolveAssignment(
    { field1: "this is an edit to field1" },
    hash2,
    adam.id,
    true
  );

  const rejectAssignment = await resolveAssignment(
    { field1: "this is an edit " },
    hash3,
    admin.id,
    false
  );

  const pendingAssignment = await resolveAssignment(
    { field1: "this is an edit " },
    hash1,
    admin.id,
    undefined
  );

  console.log("Seeding complete!");
}

if (require.main === module) {
  seedDatabase(prisma)
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}
