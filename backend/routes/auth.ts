import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { makeUser } from "../prisma/resolvers";
const express = require("express");
const passport = require("passport");
const prisma = new PrismaClient();

var router = express.Router();

/* POST /login
 * Expects a post request with the fields
 * This route logs the user in
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

/* POST /signup
 *
 * This route signs up a user but DOES NOT log in the user (yet)
 */
router.post("/signup", <RequestHandler>async function (req, res, next) {
  return res.send(
    JSON.stringify(
      await makeUser(req.body.name, req.body.password, req.body.email)
    )
  );
});

module.exports = router;
