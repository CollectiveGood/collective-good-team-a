import { User } from "@prisma/client";
import { RequestHandler } from "express";
import { memoryStorage } from "multer";
import { localFileStorage } from "../fileHandler/localFileStorage";
import { addCase, getCases } from "../prisma/resolvers";
import { localAuthStrategy } from "./authStrategy";
const multer = require("multer");
const upload = multer(memoryStorage());

var express = require("express");
const fileStorage = new localFileStorage();

var router = express.Router();
router.get("/getCase/:id", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    const id = parseInt(req.params.id);
    const file = await fileStorage.getFileID(id);
    if (file === undefined) {
      return res.redirect("/Error");
    }
    res.setHeader("Content-Type", "application/pdf");
    res.send(file);
  }
));

router.get("/cases", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    const cases = await getCases();
    res.send({ response: JSON.stringify(cases) });
  }
));

router.post("/addCase", localAuthStrategy, upload.single("file"), <
  RequestHandler
>async function (req, res, next) {
  const file = req.file;
  if (file === undefined) {
    return res.redirect("/Error");
  }
  const path = fileStorage.uploadFile(file.buffer, file.originalname);
  const newCase = await addCase((req.user as User).id, path);
  res.send({
    response:
      "uploaded " + file!.originalname + " successful! with ID " + newCase.id,
  });
});

module.exports = router;
