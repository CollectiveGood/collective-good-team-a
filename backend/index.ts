import { Express } from "express";
import { env } from "process";

const express = require("express");
const cors = require("cors");
const passport = require("passport");
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

app.use("/", require("./routes/auth"));
app.use("/", require("./routes/user"));
app.use("/", require("./routes/case"));
app.use("/", require("./routes/errors"));

const PORT = process.env.PORT || 3000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
