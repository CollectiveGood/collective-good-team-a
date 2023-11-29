import { PrismaClient } from "@prisma/client";
import request from "supertest";
import { app } from "../index";
import { getCookies } from "./helper";

process.env.DATABASE_URL =
  "postgresql://postgres:CollectiveGoodDatabase@db.bqsosumcrbsebflyvxdu.supabase.co:5432/postgres";

const prisma = new PrismaClient();

const user = { username: "adam@gmail.com", password: "test" };
const admin = { username: "admin@gmail.com", password: "admin" };

let adminCookies: any;
let userCookies: any;
// Should run prisma migrate reset --force before running this test
beforeAll(async () => {
  adminCookies = await getCookies(admin);
  userCookies = await getCookies(user);
});

describe("getAssignments", () => {
  describe("Tests getting assignments", () => {
    it("get /assignedCases", async () => {

      const response = await request(app)
        .post("/assignedCases")
        .set("Cookie", userCookies);
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    }, 10000);
  });
});

describe("Test assignment full cycle", () => {
  let hash = "";

  describe("initializes test data", () => {
    it("POST /addCase", async () => {
      const response = await request(app)
        .post("/addCase")
        .attach("file", "./files/a.pdf")
        .set("Cookie", adminCookies);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("fileName");
      hash = response.body["fileName"];
    });
  });

  describe("assigns a case", () => {
    it("POST /assignCase", async () => {
      const body = {
        user: "adam@gmail.com",
        reviewer: "admin@gmail.com",
        hash: hash,
      }
      const response = await request(app)
        .post("/assignCase")
        .send(body)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
    });
  });

  describe("deletes a case", () => {
    it("POST /deleteCase", async () => {
      const response = await request(app)
        .post("/deleteCase")
        .send({ hash: hash })
        .set("Cookie", adminCookies);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("fileName");
    });
  });
});
