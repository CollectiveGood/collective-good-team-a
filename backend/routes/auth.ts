import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { makeUser } from "../prisma/resolvers";
const express = require("express");
const passport = require("passport");
const prisma = new PrismaClient();

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

var router = express.Router();

/*
 * Expects a post request with the fields
 * @param {String} username
 * @param {String} password
 */
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/unAuthorized",
    failureMessage: true,
  }),
  <RequestHandler>function (req, res, next) {
    res.send("login successful");
  }
);

/* POST /logout
 *
 * This route logs the user out.
 */
router.post("/logout", <RequestHandler>function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.post("/signup", <RequestHandler>async function (req, res, next) {
  return res.send(
    JSON.stringify(
      await makeUser(req.body.name, req.body.password, req.body.email)
    )
  );
});

module.exports = router;