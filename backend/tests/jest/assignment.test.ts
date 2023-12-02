import { PrismaClient } from "@prisma/client";
import request from "supertest";
import { app } from "../../index";
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
        .get("/assignedCases")
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
        case: hash,
      }
      const response = await request(app)
        .post("/assignCase")
        .send(body)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
    });
  });

  describe("complete an assignment", () => {
    it("POST /updateAssignment", async () => {
      const body = {
        json: { "test": "test" },
        caseId: hash,
        completed: true,
      }
      const response = await request(app)
        .post("/updateAssignment")
        .send(body)
        .set("Cookie", userCookies);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("completed");
      expect(response.body["completed"]).toBe(true);
    });
  })

  describe("resolves an assignment", () => {
    it("POST /resolveAssignment", async () => {
      const body = {
        json: { "test": "test" },
        caseId: hash,
        resolved: true,
      }
      const response = await request(app)
        .post("/resolveAssignment")
        .send(body)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("reviewed");
      expect(response.body["reviewed"]).toBe("ACCEPTED");
    });
  })

  describe("ensures assignment is saved to final", () => {
    it("GET /getFinal", async () => {
      const response = await request(app)
        .get(`/getFinal/${hash}`)
        .set("Cookie", adminCookies);
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
    })
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
