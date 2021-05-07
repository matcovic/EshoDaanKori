import express from "express";
import { userInfoController } from "../controllers/data.js";

const dataRouter = express.Router();

dataRouter.get("/user-profile", userInfoController);

export default dataRouter;
