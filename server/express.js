import express from "express";
import User from "./models/user.js";

const app = express();

app.get("/api/products", (req, res) => {
  console.log("hello sucker");
  res.json({ status: "OKAY SUCKER" });
});

app.get("/api/test", (req, res) => {
  console.log("saving to db");
  const user = new User({
    name: "Ahnaf",
    birthDate: "NOV 3",
  });
  user.save().then((result) => {
    res.send(result);
  });
});

export default app;
