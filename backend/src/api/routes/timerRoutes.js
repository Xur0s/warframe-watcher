import express from "express";
import TimerController from "../controller/timerController.js";

const timerRouter = express.Router();

timerRouter.get("/", TimerController.getActiveTimers);

export default timerRouter;
