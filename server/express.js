import express from "express";
import landingPageRouter from "./routes/landing.js";
import authRouter from "./routes/auth.js";
import dataRouter from "./routes/data.js";

import { passport } from "./config/config.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { config } from "dotenv";
import { campaignRouter } from "./routes/campaign.js";
import { testController } from "./controllers/test.js";
import cors from "cors";

if (process.env.NODE_ENV !== "production") {
  config();
}

const app = express();
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: true,
    origin: [process.env.CLIENT_HOST, process.env.CLIENT_HOST_PRODUCTION],
    allowedHeaders: "Content-Type, Authorization",
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//app.use(express.urlencoded({ extended: true }));

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
    /* Note be careful when setting secure to true, as compliant clients will not send 
    the cookie back to the server in the future if the browser does not have an HTTPS connection. */
    cookie: {
      maxAge: 30 * 1000 * 60 * 60 * 24, // Equals 30 days
      sameSite: "none",
      secure: true,
      httpOnly: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

/**
 * -------------- ROUTES ----------------
 */

// for server message
app.get("/", (req, res) => {
  res.send("Initializing server...");
});

app.get("/test", testController);

app.use("/api", landingPageRouter);

app.use("/api/auth", authRouter);
app.use("/verify", authRouter);

app.use("/api/data", dataRouter);
app.use("/api/campaign", campaignRouter);

export default app;
