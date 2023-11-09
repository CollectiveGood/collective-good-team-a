import { PrismaClient } from "@prisma/client";
import request from "supertest";
import { app } from "../index";
import { seedDatabase } from "../prisma/seed";

process.env.DATABASE_URL =
  "postgresql://postgres:CollectiveGoodDatabase@db.bqsosumcrbsebflyvxdu.supabase.co:5432/postgres";

const prisma = new PrismaClient();

beforeAll(async () => {
  try {
    await seedDatabase(prisma);
  } catch (e) {
    console.log("Database is already seeded!");
  }
});

afterAll(async () => {});

describe("Login", () => {
  describe("POST /user/login", () => {
    it("Logins", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "adam@gmail.com", password: "test" })
        .set("Content-Type", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("email");
    }, 10000);
  });
});
