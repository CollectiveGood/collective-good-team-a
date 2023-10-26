import { PrismaClient, User } from "@prisma/client";
import { RequestHandler } from "express";
import { localAuthStrategy } from "../helper/authStrategy";
import {
  assignCase,
  getAssignedCases,
  updateAssignment,
} from "../helper/resolvers";
import { paths } from "../openapi/api";
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

/*
Gets cases assigned to a user
info == undefined means case is UNCOMPLETE
info == somejson means case is COMPLETE
*/
router.get("/assignedCases", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    type SuccessType =
      paths["/assignedCases"]["get"]["responses"]["200"]["content"]["application/json"];
    type FailureType =
      paths["/assignedCases"]["get"]["responses"]["500"]["content"]["application/json"];

    const userId = (req.user! as User).id;

    const cases = await getAssignedCases(userId);
    return res.status(200).json(cases satisfies SuccessType);
  }
));

/*
Gets cases assigned to a user
info == undefined means case is UNCOMPLETE
info == somejson means case is COMPLETE
*/
router.get("/updateAssignment", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    type InputType =
      paths["/updateAssignment"]["post"]["requestBody"]["content"]["application/x-www-form-urlencoded"];
    type SuccessType =
      paths["/updateAssignment"]["post"]["responses"]["200"]["content"]["application/json"];
    type FailureType =
      paths["/updateAssignment"]["post"]["responses"]["500"]["content"]["application/json"];

    const input: InputType = req.body;
    const userId = (req.user! as User).id;

    if (input.userId !== userId) {
      const errorMessage = {
        response: "You can't submit for a different user!",
      };
      return res.status(500).json(errorMessage satisfies FailureType);
    }

    const assignment = await updateAssignment(
      input.json,
      input.userId,
      input.caseId
    );
    return res.status(200).json(assignment satisfies SuccessType);
  }
));

module.exports = router;
