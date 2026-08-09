class FissureScheduler {
  constructor(fissureService, redisPublisher) {
    this.fissureService = fissureService;
    this.redisPublisher = redisPublisher;

    this.activeTimeouts = new Set();
    this.stopped = false; // Used to ensure that no new method calls will be made after shutdown() method has been called

    // These methods are called inside of a function and thus lose their context, so they need to be binded to an instance
    this.startRefresh = this.startRefresh.bind(this);
    this.startExpiry = this.startExpiry.bind(this);
  }

  async initialize() {
    console.log("WORKER: Initializing");
    try {
      console.log("WORKER: Initial Warframe API call for fissure data...");

      const fissures = await this.fissureService.getFissures();
      this.redisPublisher.publish("new-fissures", fissures);
    } catch (err) {
      console.error("Worker scheduler Error: Initializing failed", err);
    }
  }

  // Refresh fissure missions
  async startRefresh() {
    const msUntilNextRefresh = 10 * 60000; // 10 mins

    // `setTimeout` runs AFTER the 10 mins have passed
    const timeoutId = setTimeout(async () => {
      this.activeTimeouts.delete(timeoutId);

      try {
        console.log("WORKER: Getting fissures");
        await this.fissureService.getFissures();
      } catch (err) {
        console.error("Worker scheduler Error: Refresh fissure data", err);
      }

      if (this.stopped) return;

      await this.startRefresh(); // recursive call
    }, msUntilNextRefresh);

    // runs before `setTimeout`
    this.activeTimeouts.add(timeoutId);
  }

  // Expire old fissure missions
  async startExpiry() {
    const getExpiryTime = await this.fissureService.getEarliestExpireTime();
    const msUntilNextExpiry = getExpiryTime
      ? Math.max(0, new Date(getExpiryTime).getTime() - Date.now()) + 10000
      : 30 * 60000; // 30 mins
    console.log({
      msUntilNextExpiry: msUntilNextExpiry,
      scheduledTime: new Date(Date.now() + msUntilNextExpiry),
    });
    const timeoutId = setTimeout(async () => {
      this.activeTimeouts.delete(timeoutId);

      console.log({ firedExpiryAt: new Date() });

      try {
        await this.fissureService.expireFissures();
      } catch (err) {
        console.error("Worker scheduler Error: Expire fissure data", err);
      }

      if (this.stopped) return;

      this.startExpiry(); // recursive call
    }, msUntilNextExpiry);

    this.activeTimeouts.add(timeoutId);
  }

  // Used to shutdown any active timeouts and ensure no new method calls are made
  async shutdown() {
    this.stopped = true;

    for (const id of this.activeTimeouts) {
      clearTimeout(id);
    }

    this.activeTimeouts.clear();
  }
}

export default FissureScheduler;
