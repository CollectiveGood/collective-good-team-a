import { User } from "@prisma/client";
import { RequestHandler } from "express";
import { memoryStorage } from "multer";
import { localAuthStrategy } from "../helper/authStrategy";
import { localFileStorage } from "../helper/fileHandler/localFileStorage";
import {
  addCase,
  assignCase,
  catchErrors,
  getAssignedCases,
  getCases,
} from "../helper/resolvers";
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

/*
Uploads a PDF to the server and inserts an entry into the database, with the hash of the path as the key
Expects file in form-data
 */
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

/*
Assigns a case to a user, 
Expects xxx-url-encoded of `user` and `case`
 */
router.post("/assignCase", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    const assignee: number = parseInt(req.body.user);
    const hash: string = req.body.case;
    console.log(assignee, hash);
    const resp = await catchErrors(assignCase)(assignee, hash);
    if (resp instanceof Error) {
      return res.send(JSON.stringify(resp.message));
    } else {
      return res.send(JSON.stringify(resp));
    }
  }
));

/*
Gets cases assigned to a user
info == undefined means case is UNCOMPLETE
info == somejson means case is COMPLETE
*/
router.get("/assignedCases", localAuthStrategy, <RequestHandler>(
  async function (req, res, next) {
    const userId = (req.user! as User).id;

    const cases = await getAssignedCases(userId);
    return res.send(JSON.stringify(cases));
  }
));

module.exports = router;
