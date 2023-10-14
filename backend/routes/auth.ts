import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { catchErrors, makeUser } from "../helper/resolvers";
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
    res.send({ response: "login successful" });
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
  const user = await catchErrors(makeUser)(
    req.body.name,
    req.body.password,
    req.body.email
  );
  if (user instanceof Error) {
    return res.send(JSON.stringify(user.message));
  } else {
    req.login(user, function (err) {
      if (err) return next(err);
      res.send(JSON.stringify(user));
    });
  }
});

module.exports = router;
