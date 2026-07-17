import express from "express";

import PreferenceRepository from "../repositories/PreferenceRepository.js";
import PreferenceService from "../services/PreferenceService.js";
import PreferenceController from "../controllers/PreferenceController.js";

const preferenceRouter = express.Router();

// Dependencies
const preferenceRepository = new PreferenceRepository();
const preferenceService = new PreferenceService(preferenceRepository);
const preferenceController = new PreferenceController(preferenceService);

// Routes
preferenceRouter.post("/", preferenceController.savePreference);
preferenceRouter.get(
  "/:deviceId/get-preference",
  preferenceController.getDevicePreferences,
);
preferenceRouter.delete(
  "/:deviceId/remove-preference",
  preferenceController.removeDevicePreference,
);

export default preferenceRouter;
