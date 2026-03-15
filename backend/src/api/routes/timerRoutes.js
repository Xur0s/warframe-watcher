import express from "express";
import TimerController from "../controller/timerController.js";

const timerRouter = express.Router();

timerRouter.get("/", TimerController.getActiveTimers);

timerRouter.get("/normal", TimerController.getNormalFissures);

timerRouter.get("/hard", TimerController.getHardFissures);

timerRouter.get("/storm", TimerController.getStormFissures);

export default timerRouter;
