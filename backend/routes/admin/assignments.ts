import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
var express = require("express");
const prisma = new PrismaClient();

var router = express.Router();

/*
Assigns a case to a user, 
Expects xxx-url-encoded of `user` and `case`
 */
router.post("/assignCase", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    type InputType =
      paths["/assignCase"]["post"]["requestBody"]["content"]["application/x-www-form-urlencoded"];
    type SuccessType =
      paths["/assignCase"]["post"]["responses"]["200"]["content"]["application/json"];
    type FailureType =
      paths["/assignCase"]["post"]["responses"]["500"]["content"]["application/json"];

    const input: InputType = req.body;
    const assignee = parseInt(input.user);
    const hash = input.case;

    const existingAssignment = await prisma.assignments.findFirst({
      where: { hash: hash, userId: assignee },
    });

    if (existingAssignment) {
      const errorResponse = {
        response: "This case has already been assigned to this user!",
      };
      return res.status(500).json(errorResponse satisfies FailureType);
    }

    const resp = await assignCase(assignee, hash);
    return res.status(200).json(resp satisfies SuccessType);
  }
));

module.exports = router;
