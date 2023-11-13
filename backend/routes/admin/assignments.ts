import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { localAuthStrategy } from "../../helper/authStrategy";
import {
  assignCase,
  getAssignmentsAdmin,
  resolveAssignment,
} from "../../helper/resolvers/assignment";
import { getIdFromEmail } from "../../helper/resolvers/user";
import { paths } from "../../openapi/api";
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
      paths["/assignCase"]["post"]["requestBody"]["content"]["application/json"];
    type SuccessType =
      paths["/assignCase"]["post"]["responses"]["200"]["content"]["application/json"];
    type FailureType =
      paths["/assignCase"]["post"]["responses"]["500"]["content"]["application/json"];

    const input: InputType = req.body;

    let assignee: number = NaN;
    const hash = input.case;

    // user is an email
    if (isNaN(Number(input.user))) {
      assignee = (await getIdFromEmail(input.user))!;
    } else {
      // user is an id
      assignee = parseInt(input.user);
    }

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

router.post("/resolveAssignment", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    type InputType =
      paths["/resolveAssignment"]["post"]["requestBody"]["content"]["application/json"];
    type SuccessType =
      paths["/resolveAssignment"]["post"]["responses"]["200"]["content"]["application/json"];
    type FailureType =
      paths["/resolveAssignment"]["post"]["responses"]["500"]["content"]["application/json"];

    const input: InputType = req.body;
    const assignment = await resolveAssignment(
      input.userId,
      input.caseId,
      input.resolved
    );
    return res.status(200).json(assignment satisfies SuccessType);
  }
));

router.post("/getAssignments", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    type InputType =
      paths["/getAssignments"]["post"]["requestBody"]["content"]["application/json"];
    type SuccessType =
      paths["/getAssignments"]["post"]["responses"]["200"]["content"]["application/json"];
    type FailureType =
      paths["/getAssignments"]["post"]["responses"]["500"]["content"]["application/json"];
    const input = req.body as InputType;
    const assignments = await getAssignmentsAdmin(
      input.includeNotCompleted,
      input.includeReviewed,
      input.start,
      input.take,
      input.desc,
      input.hash
    );
    return res.status(200).json(assignments satisfies SuccessType);
  }
));
module.exports = router;
