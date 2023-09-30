import { RequestHandler } from "express";

var ensureLogIn = require("connect-ensure-login").ensureLoggedIn;
var express = require("express");
var ensureLoggedIn = ensureLogIn();

var router = express.Router();
router.get("/home", ensureLoggedIn, <RequestHandler>function (req, res, next) {
  res.send("hi!");
});

router.get("/details", ensureLoggedIn, <RequestHandler>(
  function (req, res, next) {
    req.user!.id;
  }
));

module.exports = router;
