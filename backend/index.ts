import { Express } from "express";
import { env } from "process";

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const caseRouter = require("./routes/case");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const cookieParser = require("cookie-parser");

const app: Express = express();

// Middleware initialization
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 24 },
    store: new pgSession({
      createTableIfMissing: true,
      conString: env.DATABASE_URL,
      tableName: "user_sessions",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.authenticate("session"));
// Middleware initialization done

// Entry point for application
app.get("/", (req, res) => {
  res.send({ response: "homePage" });
});

app.get("/unAuthorized", (req, res) => {
  res.status(401).send({ response: "Please log in" });
});
app.get("/Forbidden", (req, res) => {
  res.status(403).send({ response: "you are not an admin!" });
});

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", caseRouter);

const PORT = process.env.PORT || 3000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
