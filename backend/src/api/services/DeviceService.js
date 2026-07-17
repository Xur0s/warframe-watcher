// Handles operations that relate to device identification (registering, deleting, getting, updating activity)
class DeviceService {
  constructor(deviceRepository) {
    this.deviceRepository = deviceRepository;
  }

  async register(deviceId, expoPushToken) {
    if (!deviceId) {
      throw new Error("Device id is required");
    }
    if (!expoPushToken) {
      throw new Error("Expo push token is required");
    }

    return this.deviceRepository.upsert(deviceId, expoPushToken);
  }

  async activity(deviceId) {
    return this.deviceRepository.updateLastSeen(deviceId);
  }

  async get(deviceId) {
    return this.deviceRepository.findById(deviceId);
  }

  async remove(deviceId) {
    return this.deviceRepository.delete(deviceId);
  }
}

export default DeviceService;
