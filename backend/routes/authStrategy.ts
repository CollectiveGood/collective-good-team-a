import { PrismaClient, User } from "@prisma/client";
import { Strategy as LocalStrategy } from "passport-local";
const passport = require("passport");
const prisma = new PrismaClient();

passport.use(
  "local",
  new LocalStrategy(async function verify(email, password, done) {
    const user = await prisma.user.findFirst({ where: { email: email } });
    if (user?.password === password) {
      return done(null, user);
    }
    return done(null, false);
  })
);

export function localAuthStrategy(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

export function adminAuthStrategy(req: any, res: any, next: any) {
  const user = req.user as User;
  if (!req.isAuthenticated() || user.role !== "ADMIN") {
    res.redirect("/");
  }
  next();
}
