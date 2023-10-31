import { RequestHandler } from "express";
import { memoryStorage } from "multer";
import { localAuthStrategy } from "../../helper/authStrategy";
import { googleFileStorage } from "../../helper/fileHandler/googleFileStorage";
import { getCases } from "../../helper/resolvers";
import { paths } from "../../openapi/api";
const multer = require("multer");
const upload = multer(memoryStorage());

var express = require("express");
const fileStorage = new googleFileStorage();

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

module.exports = router;
