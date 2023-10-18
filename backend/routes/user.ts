import { User } from "@prisma/client";
import { RequestHandler } from "express";
import { adminAuthStrategy, localAuthStrategy } from "../helper/authStrategy";
import { paths } from "../types/api";

var express = require("express");
var router = express.Router();

router.get("/details", localAuthStrategy, <RequestHandler>(
  function (req, res, next) {
    type SuccessType =
      paths["/details"]["get"]["responses"]["200"]["content"]["application/json"];

    res.status(200).json(req.user as User satisfies SuccessType);
  }
));

router.get("/adminDetails", adminAuthStrategy, <RequestHandler>(
  function (req, res, next) {
    type SuccessType =
      paths["/details"]["get"]["responses"]["200"]["content"]["application/json"];

    res.status(200).send(req.user as SuccessType);
  }
));

module.exports = router;
