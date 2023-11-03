import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { googleFileStorage } from "../helper/fileHandler/googleFileStorage";
import {
  addCase,
  assignCase,
  makeAdminUser,
  makeUser,
  resolveAssignment,
  updateAssignment,
} from "../helper/resolvers";

const fileHandler = new googleFileStorage();
const prisma = new PrismaClient();

async function main() {
  await fileHandler.deleteAll();
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

  await assignCase(adam.id, hash1);
  await assignCase(adam.id, hash2);
  await assignCase(tyler.id, hash1);
  await assignCase(tyler.id, hash4);
  const unsubmittedAssignment = await updateAssignment(
    { field1: "this is field1", field2: "this is field2" },
    adam.id,
    hash1,
    false
  );
  const incompleteAssignment = await updateAssignment(
    undefined,
    adam.id,
    hash2,
    false
  );
  const submittedAssignment = await updateAssignment(
    { field1: "this is a submittedCase case" },
    tyler.id,
    hash1,
    true
  );
  await updateAssignment(
    { field1: "this is the final submission" },
    tyler.id,
    hash4,
    true
  );
  const resolvedAssignment = await resolveAssignment(tyler.id, hash1, true);

  const update = await prisma.case.update({
    where: { fileName: hash4 },
    data: {
      finalJson: { field1: "this is the final submission" },
      completed: true,
    },
  });

  console.log("Seeding complete!");
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
