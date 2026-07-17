import express from "express";

import DeviceRepository from "../repositories/DeviceRepository.js";
import DeviceService from "../services/DeviceService.js";
import DeviceController from "../controllers/DeviceController.js";

const deviceRouter = express.Router();

// Dependencies
const deviceRepository = new DeviceRepository();
const deviceService = new DeviceService(deviceRepository);
const deviceController = new DeviceController(deviceService);

// Routes
deviceRouter.post("/", deviceController.registerDevice);
deviceRouter.patch("/:deviceId/heartbeat", deviceController.updateActivity);
deviceRouter.get("/:deviceId/get-device", deviceController.getDevice);
deviceRouter.delete("/:deviceId/remove-device", deviceController.removeDevice);

export default deviceRouter;
