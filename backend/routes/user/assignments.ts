import { User } from "@prisma/client";
import { RequestHandler } from "express";
import { localAuthStrategy } from "../../helper/authStrategy";
import {
  getAssignedCases,
  getAssignment,
  getReview,
  getReviewerCases,
  resolveAssignment,
  updateAssignment,
} from "../../helper/resolvers/assignment";
import { paths } from "../../openapi/api";

var express = require("express");

var router = express.Router();

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

router.get("/assignedReviewerCases", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    type SuccessType =
      paths["/assignedCases"]["get"]["responses"]["200"]["content"]["application/json"];
    type FailureType =
      paths["/assignedCases"]["get"]["responses"]["500"]["content"]["application/json"];

    const userId = (req.user! as User).id;

    const cases = await getReviewerCases(userId);
    return res.status(200).json(cases satisfies SuccessType);
  }
));

router.get("/getAssignment/:caseId", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    type SuccessType =
      paths["/getAssignment/{caseId}"]["get"]["responses"]["200"]["content"]["application/json"];
    type FailureType =
      paths["/getAssignment/{caseId}"]["get"]["responses"]["500"]["content"]["application/json"];

    const userId = (req.user! as User).id;
    const caseId = req.params.caseId;

    const assignment = await getAssignment(caseId, userId);
    if (assignment === null) {
      return res
        .status(500)
        .json({ response: "Assignment not found" } satisfies FailureType);
    }
    return res.status(200).json(assignment satisfies SuccessType);
  }
));

router.get("/getReview/:caseId", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    type SuccessType =
      paths["/getReview/{caseId}"]["get"]["responses"]["200"]["content"]["application/json"];
    type FailureType =
      paths["/getReview/{caseId}"]["get"]["responses"]["500"]["content"]["application/json"];

    const userId = (req.user! as User).id;
    const caseId = req.params.caseId;

    const assignment = await getReview(caseId, userId);
    if (assignment === null) {
      return res
        .status(500)
        .json({ response: "Assignment not found" } satisfies FailureType);
    }
    return res.status(200).json(assignment satisfies SuccessType);
  }
));
/*
Gets cases assigned to a user
info == undefined means case is UNCOMPLETE
info == somejson means case is COMPLETE
*/
router.post("/updateAssignment", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    type InputType =
      paths["/updateAssignment"]["post"]["requestBody"]["content"]["application/json"];
    type SuccessType =
      paths["/updateAssignment"]["post"]["responses"]["200"]["content"]["application/json"];
    type FailureType =
      paths["/updateAssignment"]["post"]["responses"]["500"]["content"]["application/json"];

    const input: InputType = req.body;
    const user = req.user! as User;

    const assignment = await updateAssignment(
      input.json,
      input.caseId,
      user.id,
      input.completed ?? false
    );
    return res.status(200).json(assignment satisfies SuccessType);
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
      input.json,
      input.caseId,
      user.id,
      input.resolved
    );
    return res.status(200).json(assignment satisfies SuccessType);
  }
));

module.exports = router;
