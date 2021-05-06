import express from "express";
import landingPageRouter from "./routes/landing.js";
import testRouter from "./routes/test.js";
import authRouter from "./routes/auth.js";
import dataRouter from "./routes/data.js";

import { passport } from "./config/config.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  config();
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * -------------- SESSION ----------------
 */

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: process.env.DB_URI,
      collection: "sessions",
    }),
    cookie: {
      maxAge: 30 * 1000 * 60 * 60 * 24, // Equals 30 days
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

/**
 * -------------- ROUTES ----------------
 */

app.use("/api", landingPageRouter);
app.use("/api", testRouter);

app.use("/api/auth", authRouter);
app.use("/verify", authRouter);

app.use("/api/data", dataRouter);

export default app;
