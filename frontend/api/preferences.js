async function savePreferences(deviceId, filter) {
  const URL = process.env.EXPO_PUBLIC_API_URL;
  const service = "api/preferences";
  const data = { deviceId: deviceId, filter: filter };

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

export default savePreferences;
