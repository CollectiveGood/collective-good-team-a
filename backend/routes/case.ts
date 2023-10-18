import { User } from "@prisma/client";
import { RequestHandler } from "express";
import { memoryStorage } from "multer";
import { localAuthStrategy } from "../helper/authStrategy";
import { localFileStorage } from "../helper/fileHandler/localFileStorage";
import { addCase, catchErrors, getCases } from "../helper/resolvers";
import { paths } from "../types/api";
const multer = require("multer");
const upload = multer(memoryStorage());

var express = require("express");
const fileStorage = new localFileStorage();

var router = express.Router();

/* 
Gets the PDF of a case from the hash of the path
Expects xxx-url-encoded of `hash`
*/
router.get("/getCase/:hash", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    type SuccessType =
      paths["/getCase/{hash}"]["get"]["responses"]["200"]["content"]["application/pdf"];
    type FailureType =
      paths["/getCase/{hash}"]["get"]["responses"]["500"]["content"]["application/json"];

    const hash: string = req.params.hash;
    const file = await fileStorage.getFileID(hash);
    if (file === undefined) {
      return res.status(500).json({ response: "failed" } satisfies FailureType);
    }
    res.status(200).setHeader("Content-Type", "application/pdf");
    res.send(file);
  }
));

router.get("/cases", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    type SuccessType =
      paths["/cases"]["get"]["responses"]["200"]["content"]["application/json"];

    const cases = await getCases();
    res.status(200).json(cases satisfies SuccessType);
  }
));

/*
Uploads a PDF to the server and inserts an entry into the database, with the hash of the path as the key
Expects file in form-data
 */
router.post("/addCase", localAuthStrategy, upload.single("file"), <
  RequestHandler
>async function (req, res, next) {
  type InputType =
    paths["/addCase"]["get"]["requestBody"]["content"]["multipart/form-data"]["file"];
  type SuccessType =
    paths["/addCase"]["get"]["responses"]["200"]["content"]["application/json"];
  type FailureType =
    paths["/addCase"]["get"]["responses"]["500"]["content"]["application/json"];

  const file = req.file;
  if (file === undefined) {
    const errorResponse = { response: "file was not found!" };
    return res.status(500).json(errorResponse satisfies FailureType);
  }
  const path = fileStorage.uploadFile(file.buffer, file.originalname);

  const response = await catchErrors(addCase)(
    (req.user as User).id,
    path,
    file.originalname
  );

  if (response instanceof Error) {
    res.status(500).json({ response: response.message } satisfies FailureType);
  } else {
    res.status(200).json(response satisfies SuccessType);
  }
});

module.exports = router;
