import * as Device from "expo-device"; // "Device" gets information on devices that are running the frontend
import * as Notifications from "expo-notifications";

async function getExpoPushToken() {
  if (!Device.isDevice) {
    console.warn("Push notfications tokens require a physical device");
    return null;
  }

  // Check if notification permission was previously given
  const { status: previousStatus } = await Notifications.getPermissionsAsync();

  // If permission was not given, ask again
  // If it was given, use previous permission
  const requestPermission =
    previousStatus !== "granted"
      ? (await Notifications.requestPermissionsAsync()).status
      : previousStatus;

  if (requestPermission !== "granted") {
    return null;
  }

  const token = await Notifications.getExpoPushTokenAsync({
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  });

  return token.data;
}

export default getExpoPushToken;
