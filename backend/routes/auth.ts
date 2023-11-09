import { PrismaClient, User } from "@prisma/client";
import { RequestHandler } from "express";
import { getHash } from "../helper/resolvers/misc";
import { makeUser, updateUser } from "../helper/resolvers/user";
import { paths } from "../openapi/api";
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

    res.status(200).json(req.user as User satisfies SuccessType);
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
  type ConflictType =
    paths["/signup"]["post"]["responses"][409]["content"]["application/json"];
  type FailureType =
    paths["/signup"]["post"]["responses"][500]["content"]["application/json"];

  const input: InputType = req.body;

  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: { email: input.email },
  });

  if (existingUser) {
    const errorResponse = { response: "User with this email already exists." };
    return res.status(409).json(errorResponse satisfies ConflictType);
  }

  // If no existing user, create one
  const user = await makeUser(input.name, input.password, input.email);
  req.login(user, function (err) {
    if (err) return next(err);
    res.status(200).json(user satisfies SuccessType);
  });
});

/*
Updates a user and ensures the new information is valid
*/
router.post("/updateAccount", <RequestHandler>async function (req, res, next) {
  type InputType =
    paths["/updateAccount"]["post"]["requestBody"]["content"]["application/json"];
  type SuccessType =
    paths["/signup"]["post"]["responses"][200]["content"]["application/json"];
  type ConflictType =
    paths["/signup"]["post"]["responses"][409]["content"]["application/json"];
  type FailureType =
    paths["/signup"]["post"]["responses"][500]["content"]["application/json"];

  const input: InputType = req.body;
  const currUser = req.user as User;

  // checks if the old password is correct
  if (getHash(input.oldPassword + currUser.email) !== currUser.password) {
    const errorResponse = {
      response: "incorrect existing password!",
    };
    return res.status(409).json(errorResponse satisfies ConflictType);
  }

  // Check if user already exists and is not the current user
  if (currUser.email !== input.email) {
    const existingUser = await prisma.user.findFirst({
      where: { email: input.email },
    });

    if (existingUser) {
      const errorResponse = {
        response: "User with this email already exists.",
      };
      return res.status(409).json(errorResponse satisfies ConflictType);
    }
  }

  // Update user information
  const user = await updateUser(
    currUser.id,
    input.name,
    input.password,
    input.email
  );
  return res.status(200).json(user satisfies SuccessType);
});

module.exports = router;
