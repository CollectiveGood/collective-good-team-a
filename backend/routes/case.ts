import { User } from "@prisma/client";
import { RequestHandler } from "express";
import { adminAuthStrategy, localAuthStrategy } from "./authStrategy";

var express = require("express");

var router = express.Router();
router.get("/addCase", adminAuthStrategy, <RequestHandler>(
  function (req, res, next) {
    const user = req.user! as User;
    res.send("hello admin!");
  }
));

router.get("/details", localAuthStrategy, <RequestHandler>(
  function (req, res, next) {
    res.send(JSON.stringify(req.user) + "a");
  }
));

module.exports = router;
