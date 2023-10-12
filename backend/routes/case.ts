import { User } from "@prisma/client";
import { RequestHandler } from "express";
import { memoryStorage } from "multer";
import { localAuthStrategy } from "../helper/authStrategy";
import { localFileStorage } from "../helper/fileHandler/localFileStorage";
import { addCase, catchErrors, getCases } from "../helper/resolvers";
const multer = require("multer");
const upload = multer(memoryStorage());

var express = require("express");
const fileStorage = new localFileStorage();

var router = express.Router();
router.get("/getCase/:hash", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    const hash: string = req.params.hash;
    const file = await fileStorage.getFileID(hash);
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

  const response = await catchErrors(addCase)(
    (req.user as User).id,
    path,
    "this is a pdf"
  );

  if (response instanceof Error) {
    res.send(JSON.stringify(response.message));
  } else {
    res.send(JSON.stringify(response));
  }
});

module.exports = router;
