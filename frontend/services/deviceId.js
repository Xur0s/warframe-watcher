import * as SecureStore from "expo-secure-store";
import uuid from "react-native-uuid";

const KEY = "APP_DEVICE_ID";

async function getDeviceId() {
  const existing = await SecureStore.getItemAsync(KEY);

  // Check if key already exists, if it does, return that key
  if (existing) return existing;

  // If a key doesn't exist:
  const id = uuid.v4();
  await SecureStore.setItemAsync(KEY, id); //Store it
  return id;
}

export default getDeviceId;
