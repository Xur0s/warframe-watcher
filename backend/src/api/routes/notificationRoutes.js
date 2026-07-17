import express from "express";

import NotificationRepository from "../repositories/NotificationRepository.js";
import NotificationService from "../services/NotificationService.js";
import ExpoService from "../services/ExpoService.js";
import NotificationController from "../controllers/NotificationController.js";

const notificationRouter = express.Router();

// Dependencies
const notificationRepository = new NotificationRepository();
const expoService = new ExpoService();
const notificationService = new NotificationService(
  notificationRepository,
  expoService,
);
const notificationController = new NotificationController(notificationService);

// Routes
notificationRouter.post("/", notificationController.sendNotifications);

export default notificationRouter;
