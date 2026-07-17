// Gets tokens of users whose preferences match the mission
// and tells expo to send notifications
class NotificationService {
  constructor(notificationRepository, expoService) {
    this.notificationRepository = notificationRepository;
    this.expoService = expoService;
  }

  async missionNotifications(mission) {
    if (mission.expired) {
      return;
    }

    const tokens =
      await this.notificationRepository.findExpoPushTokensMatchingMission(
        mission,
      );

    if (tokens.length === 0) {
      return;
    }

    await this.expoService.sendMissionNotification(tokens, mission);
  }
}

export default NotificationService;
