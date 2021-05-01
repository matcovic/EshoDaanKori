import express from "express";
import landingPageRouter from "./routes/landing.js";
import testRouter from "./routes/test.js";

const app = express();

app.use("/api", landingPageRouter);
app.use("/api", testRouter);

export default app;
