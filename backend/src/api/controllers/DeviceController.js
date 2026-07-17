class DeviceController {
  constructor(deviceService) {
    this.deviceService = deviceService;
  }

  async registerDevice(req, res, next) {
    const { deviceId, expoPushToken } = req.body;

    try {
      const device = this.deviceService.register(deviceId, expoPushToken);

      return res.status(200).json(device);
    } catch (err) {
      next(err);
    }
  }

  async updateActivity(req, res, next) {
    const { deviceId } = req.params;

    try {
      const lastSeen = this.deviceService.activity(deviceId);

      return res.status(200).json(lastSeen);
    } catch (err) {
      next(err);
    }
  }

  async getDevice(req, res, next) {
    const { deviceId } = req.params;

    try {
      const device = this.deviceService.get(deviceId);

      return res.status(200).json(device);
    } catch (err) {
      next(err);
    }
  }

  async removeDevice(req, res, next) {
    const { deviceId } = req.params;

    try {
      const isRemoved = this.deviceService.remove(deviceId);
      if (!isRemoved) return res.sendStatus(404);

      return res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

export default DeviceController;
