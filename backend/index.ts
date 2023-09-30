import { PrismaClient } from "@prisma/client";
import { Express } from "express";
import { env } from "process";
const express = require("express");

const prisma = new PrismaClient();
const passport = require("passport");
const authRouter = require("./prisma/auth");
const indexRouter = require("./prisma/index");
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

const PORT = process.env.PORT || 3000;

// Entry point for application
app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Hello!");
});

app.use("/", authRouter);
app.use("/", indexRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/create", async (req, res) => {
  console.log(req.body);
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    },
  });
  console.log(user);
});
