async function registerDevice(deviceId, expoPushToken) {
  const URL = process.env.EXPO_PUBLIC_API_URL;
  const service = "api/devices";
  const data = { deviceId: deviceId, expoPushToken: expoPushToken };

  const res = await fetch(`${URL}/${service}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    // Body is only null when response json cannot be parsed
    const body = await res.json().catch(() => null);
    const message =
      body?.error?.message ??
      body?.message ??
      `Request failed with  ${res.status}`;

    throw new Error(message);
  }

  return res.json();
}

async function updateActivity(deviceId) {
  const URL = process.env.EXPO_PUBLIC_API_URL;
  const service = "api/devices";
  const route = "heartbeat";

  const res = await fetch(`${URL}/${service}/${deviceId}/${route}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    // Body is only null when response json cannot be parsed
    const body = await res.json().catch(() => null);
    const message =
      body?.error?.message ??
      body?.message ??
      `Request failed with  ${res.status}`;

    throw new Error(message);
  }

  return res.json();
}

export default { registerDevice, updateActivity };
