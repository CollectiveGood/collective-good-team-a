import { RequestHandler } from "express";
import { adminAuthStrategy } from "../../helper/authStrategy";
import { getUsers, updateUserRole } from "../../helper/resolvers/user";
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

router.post(
  "/updateUserRole",
  adminAuthStrategy,
  <RequestHandler>async function (req, res, next) {
    try {
      type InputType =
        paths["/updateUserRole"]["post"]["requestBody"]["content"]["application/json"];
      type SuccessType =
        paths["/updateUserRole"]["post"]["responses"]["200"]["content"]["application/json"];
      type BadRequestType =
        paths["/updateUserRole"]["post"]["responses"]["400"]["content"]["application/json"];
      type NotFoundType =
        paths["/updateUserRole"]["post"]["responses"]["404"]["content"]["application/json"];

      const input = req.body as InputType;

      if (!input.userId || !input.role) {
        const badRequestResponse: BadRequestType = {
          error: "Bad Request",
          message: "Missing or invalid userId or role in the request body",
        };
        return res.status(400).json(badRequestResponse);
      }

      const user = await updateUserRole(input.userId, input.role);

      if (!user) {
        // User not found
        const notFoundResponse: NotFoundType = {
          error: "Not Found",
          message: "User not found",
        };
        return res.status(404).json(notFoundResponse);
      }

      return res.status(200).json(user as SuccessType);

    } catch (error) {
      // Handle unexpected errors
      console.error("Error updating user role:", error);

      return res.status(500).json({
        error: "Internal Server Error",
        message: "An unexpected error occurred",
      });
    }
  }
);

module.exports = router;
