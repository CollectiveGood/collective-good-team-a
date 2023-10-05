import { RequestHandler } from "express";
import { memoryStorage } from "multer";
import { localFileStorage } from "../fileHandler/localFileStorage";
import { adminAuthStrategy, localAuthStrategy } from "./authStrategy";
const multer = require("multer");
const upload = multer(memoryStorage());

var express = require("express");

var router = express.Router();
router.get("/addCase", adminAuthStrategy, <RequestHandler>(
  function (req, res, next) {
    res.send("hello admin!");
  }
));

router.post("/addCase", localAuthStrategy, upload.single("file"), <
  RequestHandler
>function (req, res, next) {
  const fileStorage = new localFileStorage();
  const file = req.file;
  fileStorage.uploadFile(file!.buffer, file!.originalname);
  res.send({ response: "uploaded" + file!.originalname + "successful!" });
});

module.exports = router;
