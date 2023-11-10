import { User } from "@prisma/client";
import { RequestHandler } from "express";
import { memoryStorage } from "multer";
import { localAuthStrategy } from "../../helper/authStrategy";
import { googleFileStorage } from "../../helper/fileHandler/googleFileStorage";
import {
  addCase,
  deleteCase,
  getCase,
  getCases,
  resolveCase,
} from "../../helper/resolvers/case";
import { getHash } from "../../helper/resolvers/misc";
import { paths } from "../../openapi/api";
const multer = require("multer");
const upload = multer(memoryStorage());

var express = require("express");
const fileStorage = new googleFileStorage();

var router = express.Router();

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
    return next(new Error("No File Found!"));
  }
  const path = await fileStorage.uploadFile(file.buffer);

  const existingCase = await getCase(getHash(path));
  if (existingCase) {
    const errorResponse = { response: "This file already exists!" };
    return res.status(500).json(errorResponse satisfies FailureType);
  }

  const response = await addCase(
    (req.user as User).id,
    path,
    file.originalname
  );

  res.status(200).json(response satisfies SuccessType);
});

router.post("/deleteCase", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    type InputType =
      paths["/deleteCase"]["post"]["requestBody"]["content"]["application/json"];
    type SuccessType =
      paths["/deleteCase"]["post"]["responses"]["200"]["content"]["application/json"];
    type FailureType =
      paths["/deleteCase"]["post"]["responses"]["500"]["content"]["application/json"];
    const input = req.body as InputType;
    const c = await deleteCase(input.hash);
    return res.status(200).json(c satisfies SuccessType);
  }
));

router.post("/getCases", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    type InputType =
      paths["/getCases"]["get"]["requestBody"]["content"]["application/json"];
    type SuccessType =
      paths["/getCases"]["get"]["responses"]["200"]["content"]["application/json"];
    type FailureType =
      paths["/getCases"]["get"]["responses"]["500"]["content"]["application/json"];

    const input = req.body as InputType;
    const cases = await getCases(
      input.isCompleted,
      input.hasAssignments,
      input.start,
      input.take,
      input.desc
    );
    return res.status(200).json(cases satisfies SuccessType);
  }
));

router.post("/resolveCase", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    type InputType =
      paths["/resolveCase"]["post"]["requestBody"]["content"]["application/json"];
    type SuccessType =
      paths["/resolveCase"]["post"]["responses"]["200"]["content"]["application/json"];
    type FailureType =
      paths["/resolveCase"]["post"]["responses"]["500"]["content"]["application/json"];
    const input = req.body as InputType;
    const c = await resolveCase(input.hash, input.shouldResolve, input.json);
    return res.status(200).json(c satisfies SuccessType);
  }
));

module.exports = router;
