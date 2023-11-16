import { PrismaClient, User } from "@prisma/client";
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

router.post("/assignCase", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    type InputType =
      paths["/assignCase"]["post"]["requestBody"]["content"]["application/json"];
    type SuccessType =
      paths["/assignCase"]["post"]["responses"]["200"]["content"]["application/json"];
    type ConflictType =
      paths["/assignCase"]["post"]["responses"]["409"]["content"]["application/json"];
    type FailureType =
      paths["/assignCase"]["post"]["responses"]["500"]["content"]["application/json"];

    const input: InputType = req.body;

    let assignee: number = NaN;
    let reviewer: number = NaN;
    const hash = input.case;

    // user is an email
    if (isNaN(Number(input.user))) {
      assignee = (await getIdFromEmail(input.user))!;
      reviewer = (await getIdFromEmail(input.reviewer))!;
    } else {
      // user is an id
      assignee = parseInt(input.user);
      reviewer = parseInt(input.reviewer);
    }

    const existingAssignment = await prisma.assignment.findFirst({
      where: { hash: hash, userId: assignee },
    });

    const existingReview = await prisma.assignment.findFirst({
      where: { hash: hash, reviewerId: reviewer },
    });

    if (existingAssignment || existingReview || assignee === reviewer) {
      const error = existingAssignment
        ? "This case has already been assigned to this user!"
        : existingReview
        ? "This case has already been assigned to this reviewer!"
        : assignee === reviewer
        ? "Assignee and reviewer cannot be the same!"
        : "Unknown error";
      return res.status(409).json({ response: error } satisfies ConflictType);
    }

    const resp = await assignCase(assignee, reviewer, hash);
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
    const user = req.user! as User;

    const assignment = await resolveAssignment(
      input.caseId,
      user.id,
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
