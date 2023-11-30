import { RequestHandler } from "express";
import { adminAuthStrategy } from "../../helper/authStrategy";
import { getUsers, makeAdmin } from "../../helper/resolvers/user";
import { paths } from "../../openapi/api";

var express = require("express");
var router = express.Router();

router.post("/getUsers", adminAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    type InputType =
      paths["/getUsers"]["post"]["requestBody"]["content"]["application/json"];
    type SuccessType =
      paths["/getUsers"]["post"]["responses"]["200"]["content"]["application/json"];
    const input = req.body as InputType;
    const users = await getUsers(
      input.includeAdmins,
      input.email,
      input.start,
      input.take,
      input.desc
    );
    res.status(200).json(users satisfies SuccessType);
  }
));

router.get("/adminDetails", adminAuthStrategy, <RequestHandler>(
  function (req, res, next) {
    type SuccessType =
      paths["/details"]["get"]["responses"]["200"]["content"]["application/json"];

    res.status(200).send(req.user as SuccessType);
  }
));

router.post("/makeadmin", adminAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    type InputType =
      paths["/makeAdmin"]["post"]["requestBody"]["content"]["application/json"];
    type SuccessType =
      paths["/makeAdmin"]["post"]["responses"]["200"]["content"]["application/json"];
    const input = req.body as InputType
    const user = await makeAdmin(parseInt(input.userId))

    res.status(200).json(user satisfies SuccessType);
  }
))

module.exports = router;
