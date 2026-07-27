class FissureScheduler {
  constructor(fissureService) {
    this.fissureService = fissureService;

    this.activeTimeouts = new Set();
    this.stopped = false; // Used to ensure that no new method calls will be made after shutdown() method has been called
  }

  // Refresh fissure missions
  async startRefresh() {
    const msUntilNextRefresh = 10 * 60000; // 10 mins

    // `setTimeout` runs AFTER the 10 mins have passed
    const timeoutId = setTimeout(async () => {
      this.activeTimeouts.delete(timeoutId);

      try {
        console.log("Getting fissures");
        await this.fissureService.getFissures();
      } catch (err) {
        console.error("Worker scheduler Error: Refresh fissure data", err);
      }

      if (this.stopped) return;

      await this.scheduleRefresh(); // recursive call
    }, msUntilNextRefresh);

    // runs before `setTimeout`
    this.activeTimeouts.add(timeoutId);
  }

  // Expire old fissure missions
  async startExpiry() {
    const getExpiryTime = await this.fissureService.getEarliestExpireTime();
    const msUntilNextExpiry = getExpiryTime
      ? Math.max(0, new Date(getExpiryTime) - Date.now())
      : 30 * 60000; // 30 mins

    const timeoutId = setTimeout(async () => {
      this.activeTimeouts.delete(timeoutId);

      try {
        await this.fissureService.expireFissures();
      } catch (err) {
        console.error("Worker scheduler Error: Expire fissure data", err);
      }

      if (this.stopped) return;

      await this.scheduleExpiry(); // recursive call
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
