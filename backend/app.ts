import { Express } from "express";
import { readFileSync } from "fs";

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const cookieParser = require("cookie-parser");
// Loads values from .env
require("dotenv").config();

export const app: Express = express();

const privateKey = readFileSync('sslcert/server.key');
const certificate = readFileSync('sslcert/server.crt');
const credentials = {key: privateKey, cert: certificate};

// Middleware initialization
console.log("allowing: ", process.env.FRONTEND_URL);
app.use(cors({ credentials: true, origin: ["http://localhost:4200", process.env.FRONTEND_URL]}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 24 * 1000, secure: true, sameSite: "none" },
    store: new pgSession({
      createTableIfMissing: true,
      conString: process.env.DATABASE_URL,
      tableName: "user_sessions",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.authenticate("session"));

// Middleware initialization done

app.use("/", require("./routes/auth"));
app.use("/", require("./routes/user"));
app.use("/", require("./routes/errors"));
app.use("/", require("./routes/user/case"));
app.use("/", require("./routes/user/assignments"));
app.use("/", require("./routes/admin/case"));
app.use("/", require("./routes/admin/assignments"));
app.use("/", require("./routes/admin/users"));
app.use("/", require("./routes/admin/final"));

if (require.main === module) {
  var http = require('http');
  var https = require('https');

  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(credentials, app);

  httpServer.listen(3000, () => {`server is running on port ${3000}`});
  httpsServer.listen(8443);
  console.log("Finished Initializing!")
}

