import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { googleFileStorage } from "../helper/fileHandler/googleFileStorage";
import {
  addCase,
  assignCase,
  makeAdminUser,
  makeUser,
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

  const adam = await makeUser("adam", "test", "adam@gmail.com");
  const tyler = await makeUser("tyler", "test1", "tyler@gmail.com");
  const admin = await makeAdminUser("admin", "admin", "admin@gmail.com");
  const case1 = await addCase(admin.id, hash1, "Research Paper #1");
  const case2 = await addCase(admin.id, hash2, "Syllabus #1");

  assignCase(adam.id, hash1);
  assignCase(adam.id, hash2);
  assignCase(tyler.id, hash1);
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

  console.log({
    adam,
    tyler,
    admin,
    case1,
    case2,
    unsubmittedAssignment,
    incompleteAssignment,
    submittedAssignment,
  });
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
