import { Expo } from "expo-server-sdk";

// Handles talking with Expo API for any services needed
class ExpoService {
  constructor() {
    this.expo = new Expo();
  }

  // Sends push notifcations to users using Expo tokens
  async sendMissionNotification(tokens, mission) {
    const messages = [];

    for (const token of tokens) {
      if (!Expo.isExpoPushToken(token)) {
        continue;
      }

      messages.push({
        to: token,
        sound: "default",
        title: "Watched Mission Avaliable",
        body: `${mission.mission_type} - ${mission.planet} - ${mission.tier}`,
        data: {
          missionId: mission.id,
        },
      });

      const chunks = this.expo.chunkPushNotification(messages);

      for (const chunk of chunks) {
        await this.expo.sendPushNotificationsAsync(chunk);
      }
    }
  }
}

export default ExpoService;
