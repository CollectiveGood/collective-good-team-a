import request from "supertest";
import { app } from "../index";


export const getCookies = async (user: { username: string; password: string }) => {
    const response = await request(app)
      .post("/login")
      .send(user)
      .set("Content-Type", "application/json");
    const cookies = response.headers["set-cookie"];
    return cookies;
  };
  