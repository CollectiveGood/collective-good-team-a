import { RequestHandler } from "express";
import { localAuthStrategy } from "../../helper/authStrategy";
import { getAllResolvedByCase } from "../../helper/resolvers/final";
import { paths } from "../../openapi/api";

var express = require("express");

var router = express.Router();


router.get("/getFinal/:caseId", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    type SuccessType =
      paths["/getFinal/{caseId}"]["get"]["responses"]["200"]["content"]["application/json"];
    type FailureType =
      paths["/getFinal/{caseId}"]["get"]["responses"]["500"]["content"]["application/json"];

    const caseId = req.params.caseId;

    let assignment = await getAllResolvedByCase(caseId);
    if (assignment === null) {
      return res
        .status(500)
        .json({ response: "Assignment not found" } satisfies FailureType);
    }
    return res.status(200).json(assignment satisfies SuccessType);
  }
));

module.exports = router;
