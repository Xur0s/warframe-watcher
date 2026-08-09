import express from "express";

import FissureRepository from "../repositories/FissureRepository.js";
import FissureService from "../services/FissureService.js";
import FissureController from "../controllers/FissureController.js";

const fissureRouter = express.Router();

// Dependencies
const fissureRepository = new FissureRepository();
const fissureService = new FissureService(fissureRepository);
const fissureController = new FissureController(fissureService);

// Routes
fissureRouter.get("/", fissureController.getAllFissures);
fissureRouter.get("/normal", fissureController.getNormalFissures);
fissureRouter.get("/hard", fissureController.getHardFissures);
fissureRouter.get("/storm", fissureController.getStormFissures);

export default fissureRouter;
