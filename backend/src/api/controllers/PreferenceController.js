class PreferenceController {
  constructor(preferenceService) {
    this.preferenceService = preferenceService;
  }

  async savePreference(req, res, next) {
    const { deviceId, filter } = req.body;

    try {
      const preference = this.preferenceService.save(deviceId, filter);

      return res.status(200).json(preference);
    } catch (err) {
      next(err);
    }
  }

  async getDevicePreferences(req, res, next) {
    const { deviceId } = req.params;

    try {
      const preferences = this.preferenceService.get(deviceId);

      return res.status(200).json(preferences);
    } catch (err) {
      next(err);
    }
  }

  async removeDevicePreference(req, res, next) {
    const { deviceId } = req.params;

    try {
      const isRemoved = this.preferenceService.remove(deviceId);
      if (!isRemoved) return res.sendStatus(404);

      return res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

export default PreferenceController;
