// Handles operations that relate to user preferences (saving, deleting, getting)
class PreferenceService {
  constructor(preferenceRepository) {
    this.preferenceRepository = preferenceRepository;
  }

  async save(deviceId, filter) {
    try {
      return this.preferenceRepository.upsert(deviceId, filter);
    } catch (err) {
      if (err.code === "23503") {
        throw new Error(
          `Device id: ${deviceId} does not exist, cannot save preferences`,
        );
      }

      throw err;
    }
  }

  async get(deviceId) {
    return this.preferenceRepository.findById(deviceId);
  }

  async remove(deviceId) {
    return this.preferenceRepository.delete(deviceId);
  }
}

export default PreferenceService;
