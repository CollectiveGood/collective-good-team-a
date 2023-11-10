import { PrismaClient } from "@prisma/client";
import request from "supertest";
import { app } from "../index";
import { seedDatabase } from "../prisma/seed";

process.env.DATABASE_URL =
  "postgresql://postgres:CollectiveGoodDatabase@db.bqsosumcrbsebflyvxdu.supabase.co:5432/postgres";

const prisma = new PrismaClient();

const user = { username: "adam@gmail.com", password: "test" };
const admin = { username: "admin@gmail.com", password: "admin" };
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

describe("getCases", () => {
  describe("GET /admin/case/getCases", () => {
    it("Details", async () => {
      const cookies = await getCookies(admin);
      const body = {
        isCompleted: false,
        hasAssignments: false,
        start: 0,
        take: 10,
        desc: true,
      };
      const response = await request(app)
        .get("/getCases")
        .send(body)
        .set("Cookie", cookies);
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);

      body.hasAssignments = true;
      const response2 = await request(app)
        .get("/getCases")
        .send(body)
        .set("Cookie", cookies);
      expect(response2.body).toHaveLength(2);
      body.isCompleted = true;
      const response3 = await request(app)
        .get("/getCases")
        .send(body)
        .set("Cookie", cookies);
      expect(response3.body).toHaveLength(1);
    }, 10000);
  });
});
