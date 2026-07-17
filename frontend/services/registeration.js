import { registerDevice } from "../api/device.js";
import getDeviceId from "./deviceId.js";
import getExpoPushToken from "./notification.js";

async function registerInstallation() {
  const deviceId = await getDeviceId();
  const expoPushToken = await getExpoPushToken();

  await registerDevice(deviceId, expoPushToken);
}

export default registerInstallation;
