import { PrismaClient, User } from "@prisma/client";
import { Strategy as LocalStrategy } from "passport-local";
const passport = require("passport");
const prisma = new PrismaClient();
var sha1 = require("sha1");

/*
 * Defines a strategy to log the user in, used by passport.authenticate('local', ...)
 */
passport.use(
  "local",
  new LocalStrategy(async function verify(email, password, done) {
    const user = await prisma.user.findFirst({ where: { email: email } });
    if (user === null) {
      return done(null, undefined);
    }
    if (user.password === sha1(password + email)) {
      return done(null, user);
    }
    return done(null, false);
  })
);

/*
 * Serializes and Deserializes the user to be used between HTTP requests
 *
 */
interface Serialized {
  id: number;
}
passport.serializeUser((user: any, cb: any) => {
  const retval = { id: user.id } satisfies Serialized;
  cb(null, retval);
});

passport.deserializeUser(async (id: Serialized, cb: any) => {
  const user = await prisma.user.findFirst({ where: { id: id.id } });
  cb(null, user);
});

/*
 * Protects a route to only logged in users
 */
export function localAuthStrategy(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) {
    return res.redirect("/unAuthorized");
  }
  next();
}

/*
 * Protects a route to only ADMIN user
 */
export function adminAuthStrategy(req: any, res: any, next: any) {
  const user = req.user as User;
  if (!req.isAuthenticated()) {
    res.redirect("/unAuthorized");
  }
  if (user.role !== "ADMIN") {
    res.redirect("/Forbidden");
  }
  next();
}
