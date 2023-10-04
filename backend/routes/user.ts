import { RequestHandler } from "express";
import { adminAuthStrategy, localAuthStrategy } from "./authStrategy";

var express = require("express");
var router = express.Router();

router.get("/details", localAuthStrategy, <RequestHandler>(
  function (req, res, next) {
    res.send(JSON.stringify(req.user));
  }
));

router.get("/adminDetails", adminAuthStrategy, <RequestHandler>(
  function (req, res, next) {
    res.send(JSON.stringify(req.user));
  }
));

module.exports = router;
