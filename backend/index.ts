import { PrismaClient } from "@prisma/client";
import { Express } from "express";
const express = require("express");

const app: Express = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Entry point for application
app.post("/", (req, res) => {
  console.log(req.body);
  makeUser(req.body.name, req.body.password, req.body.email);
  res.send("Hello!");
});

app.post("addCase", (req, res) => {
  return;
});

app.get("login", (req, res) => {});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const prisma = new PrismaClient();

async function makeUser(name: string, password: string, email: string) {
  const user = await prisma.user.create({
    data: {
      name: name,
      password: password,
      email: email,
    },
  });
  console.log(user);
}

// async function main() {}

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })

//   .catch(async (e) => {
//     console.error(e);

//     await prisma.$disconnect();

//     process.exit(1);
//   });
