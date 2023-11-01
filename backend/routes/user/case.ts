import { RequestHandler } from "express";
import { localAuthStrategy } from "../../helper/authStrategy";
import { googleFileStorage } from "../../helper/fileHandler/googleFileStorage";
import { paths } from "../../openapi/api";

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

module.exports = router;
