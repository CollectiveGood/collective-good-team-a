import { User } from "@prisma/client";
import { RequestHandler } from "express";
import { localAuthStrategy } from "../helper/authStrategy";
import { localFileStorage } from "../helper/fileHandler/localFileStorage";
import { assignCase, catchErrors, getAssignedCases } from "../helper/resolvers";
import { paths } from "../types/api";
var express = require("express");
const fileStorage = new localFileStorage();

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

    const resp = await catchErrors(assignCase)(assignee, hash);
    if (resp instanceof Error) {
      const errorResponse = { response: resp.message };
      return res.status(500).json(errorResponse satisfies FailureType);
    } else {
      return res.status(200).json(resp satisfies SuccessType);
    }
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

module.exports = router;
