import { PrismaClient } from "@prisma/client";
import request from "supertest";
import { app } from "../../app";
import { getCookies } from "./helper";

process.env.DATABASE_URL =
  "postgresql://postgres:CollectiveGoodDatabase@db.bqsosumcrbsebflyvxdu.supabase.co:5432/postgres";

const prisma = new PrismaClient();

const user = { username: "adam@gmail.com", password: "test" };
const admin = { username: "admin@gmail.com", password: "admin" };

let cookies: any;
// Should run prisma migrate reset --force before running this test
beforeAll(async () => {
  cookies = await getCookies(admin);
});

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
      const response = await request(app)
        .get("/details")
        .set("Cookie", cookies);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("email");
    }, 10000);
  });
});

describe("getUsers", () => {
  describe("POST /getUsers", () => {
    it("Users", async () => {
      const body = {
        includeAdmins: false,
        email: "",
        start: 0,
        take: 10,
        desc: true
      }
      const response = await request(app)
        .post("/getUsers")
        .send(body)
        .set("Cookie", cookies);
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);

      body.includeAdmins = true;
      const response1 = await request(app)
        .post("/getUsers")
        .send(body)
        .set("Cookie", cookies);
      expect(response1.status).toBe(200);
      expect(response1.body).toHaveLength(3);

      body.email = "admin@gmail.com";
      const response2 = await request(app)
        .post("/getUsers")
        .send(body)
        .set("Cookie", cookies);
      expect(response2.status).toBe(200);
      expect(response2.body).toHaveLength(1);
    }, 10000);
  });
});
