import { PrismaClient, User } from "@prisma/client";
import { RequestHandler } from "express";
import { catchErrors, makeUser } from "../helper/resolvers";
import { components } from "../types/api";
const express = require("express");
const passport = require("passport");
const prisma = new PrismaClient();

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
    res.send(JSON.stringify(req.user as User));
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

/*
Adds a user (if unique) and signs them in
 */

router.post("/signup", <RequestHandler>async function (req, res, next) {
  const input: components["schemas"]["SignUpInput"] = req.body;
  const user = await catchErrors(makeUser)(
    input.name,
    input.password,
    input.email
  );
  if (user instanceof Error) {
    return res.redirect("/Error");
  } else {
    req.login(user, function (err) {
      if (err) return next(err);
      res.send(JSON.stringify(user));
    });
  }
});

module.exports = router;
