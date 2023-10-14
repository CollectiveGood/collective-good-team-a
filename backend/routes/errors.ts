var express = require("express");
import { RequestHandler } from "express";

var router = express.Router();

router.get("/", <RequestHandler>function (req, res) {
  res.send({ response: "homePage" });
});

router.get("/unAuthorized", <RequestHandler>function (req, res) {
  res.status(401).send({ response: "Please log in" });
});
router.get("/Forbidden", <RequestHandler>function (req, res) {
  res.status(403).send({ response: "you are not an admin!" });
});
router.get("/Error", <RequestHandler>function (req, res) {
  res.status(500).send({
    response:
      "An error occurred and the server was not able to process your request.",
  });
});

module.exports = router;
