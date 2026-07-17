class NotificationController {
  constructor(notificationService) {
    this.notificationService = notificationService;
  }

  async sendNotifications(req, res, next) {
    const { mission } = req.body;

    try {
      const notificationRecipients =
        this.notificationService.missionNotifications(mission);

      return res.status(200).json(notificationRecipients);
    } catch (err) {
      next(err);
    }
  }
}

export default NotificationController;
