import { User } from "@prisma/client";
import { RequestHandler } from "express";
import { localAuthStrategy } from "../helper/authStrategy";
import { localFileStorage } from "../helper/fileHandler/localFileStorage";
import { catchErrors, getCases, upsertInfo } from "../helper/resolvers";

var express = require("express");
const fileStorage = new localFileStorage();

var router = express.Router();

/* 

*/
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

router.post("/addInfo", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    const info = req.body.info;
    const hash = req.body.hash;
    const information = await catchErrors(upsertInfo)(
      info,
      (req.user as User).id,
      hash
    );
    if (information instanceof Error) {
      res.send(JSON.stringify(information.message));
    } else {
      res.send(JSON.stringify(information));
    }
  }
));

module.exports = router;
