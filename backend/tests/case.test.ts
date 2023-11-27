import { PrismaClient } from "@prisma/client";
import request from "supertest";
import { app } from "../index";

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
      const response = await request(app)
        .get("/details")
        .set("Cookie", cookies);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("email");
    }, 10000);
  });
});

describe("getCases", () => {
  describe("Tests getting case", () => {
    it("get /getCases", async () => {
      const body = {
        isResolved: undefined as boolean | undefined,
        hasAssignments: false,
        start: 0,
        take: 10,
        desc: true,
      };
      const response = await request(app)
        .post("/getCases")
        .send(body)
        .set("Cookie", cookies);
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);

      body.hasAssignments = true;
      body.isResolved = false;
      const response2 = await request(app)
        .post("/getCases")
        .send(body)
        .set("Cookie", cookies);
      expect(response2.body).toHaveLength(2);

      body.isResolved = true;
      const response3 = await request(app)
        .post("/getCases")
        .send(body)
        .set("Cookie", cookies);
      expect(response3.body).toHaveLength(1);
    }, 10000);
  });
});

describe("Test Case full cycle", () => {
  let hash = "";

  describe("initializes test data", () => {
    it("POST /addCase", async () => {
      const response = await request(app)
        .post("/addCase")
        .attach("file", "./files/a.pdf")
        .set("Cookie", cookies);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("fileName");
      hash = response.body["fileName"];
    });
  });

  describe("deletes a case", () => {
    it("POST /deleteCase", async () => {
      const response = await request(app)
        .post("/deleteCase")
        .send({ hash: hash })
        .set("Cookie", cookies);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("fileName");
    });
  });
});
