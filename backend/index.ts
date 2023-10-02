import { Express } from "express";
import { env } from "process";
const express = require("express");

const passport = require("passport");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const cookieParser = require("cookie-parser");

const app: Express = express();
app.set("view engine", "ejs");

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
      tableName: "user_sessions", // Use another table-name than the default "session" one
      // Insert connect-pg-simple options here
    }),
  })
);

app.use(passport.initialize());
app.use(passport.authenticate("session"));

// Entry point for application
app.get("/", (req, res) => {
  res.send("Hello!");
});

app.use("/", authRouter);
app.use("/", userRouter);

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
