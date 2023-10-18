import { PrismaClient, User } from "@prisma/client";
import { RequestHandler } from "express";
import { catchErrors, makeUser } from "../helper/resolvers";
import { paths } from "../types/api";
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
    type SuccessType =
      paths["/login"]["post"]["responses"][200]["content"]["application/json"];
    type FailureType =
      paths["/login"]["post"]["responses"][401]["content"]["application/json"];

    res.send(req.user as User satisfies SuccessType);
  }
);

/* POST /logout
 *
 * This route logs the user out.
 */
router.post("/logout", <RequestHandler>function (req, res, next) {
  type SuccessType =
    paths["/logout"]["post"]["responses"][200]["content"]["application/json"];
  type FailureType =
    paths["/logout"]["post"]["responses"][500]["content"]["application/json"];

  req.logout(function (err) {
    if (err) {
      const errorResponse = { response: "failed to logout" };
      res.status(500).json(errorResponse satisfies FailureType);
      return next(err);
    } else {
      res.status(200).json({ response: "logged out!" } satisfies SuccessType);
    }
  });
});

/*
Adds a user (if unique) and signs them in
 */

router.post("/signup", <RequestHandler>async function (req, res, next) {
  type InputType =
    paths["/signup"]["post"]["requestBody"]["content"]["application/json"];
  type SuccessType =
    paths["/signup"]["post"]["responses"][200]["content"]["application/json"];
  type FailureType =
    paths["/signup"]["post"]["responses"][500]["content"]["application/json"];

  const input: InputType = req.body;
  const user = await catchErrors(makeUser)(
    input.name,
    input.password,
    input.email
  );
  if (user instanceof Error) {
    const errorResponse = { response: user.message };
    return res.status(500).json(errorResponse satisfies FailureType);
  } else {
    req.login(user, function (err) {
      if (err) return next(err);
      res.status(200).json(user satisfies SuccessType);
    });
  }
});

module.exports = router;
