import { PrismaClient } from "@prisma/client";
import request from "supertest";
import { app } from "../index";
import { seedDatabase } from "../prisma/seed";

process.env.DATABASE_URL =
  "postgresql://postgres:CollectiveGoodDatabase@db.bqsosumcrbsebflyvxdu.supabase.co:5432/postgres";

const prisma = new PrismaClient();

const user = { username: "adam@gmail.com", password: "test" };
beforeAll(async () => {
  try {
    await seedDatabase(prisma);
  } catch (e) {
    console.log("Database is already seeded!");
  }
});

const getCookies = async (user: { username: string; password: string }) => {
  const response = await request(app)
    .post("/login")
    .send(user)
    .set("Content-Type", "application/json");
  const cookies = response.headers["set-cookie"];
  return cookies;
};

describe("Login", () => {
  describe("POST /user/login", () => {
    it("Login", async () => {
      const response = await request(app).post("/login").send(user);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("email");
    }, 10000);
  });
});

describe("getDetails", () => {
  describe("POST /user/details", () => {
    it("Details", async () => {
      const cookies = await getCookies(user);
      const response = await request(app)
        .get("/details")
        .set("Cookie", cookies);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("email");
    }, 10000);
  });
});
