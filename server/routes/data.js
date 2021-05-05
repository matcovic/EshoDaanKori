import express from "express";
import { userInfoController } from "../controllers/dataController.js";

const dataRouter = express.Router();

dataRouter.get("/user-profile", userInfoController);

export default dataRouter;
