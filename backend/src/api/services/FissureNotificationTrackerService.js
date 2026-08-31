class FissureNotficationTrackerService {
  constructor(fissureNotficationTrackerRepository) {
    this.fissureNotficationTrackerRepository =
      fissureNotficationTrackerRepository;
  }

  async insertFissure(fissureId, deviceId) {
    if (!fissureId) {
      throw new Error("Fissure id is required for insertion!");
    }
    if (!deviceId) {
      throw new Error("Device id is required for insertion!");
    }

    return this.fissureNotficationTrackerRepository.insert(fissureId, deviceId);
  }

  async deleteFissure(fissureId) {
    if (!fissureId) {
      throw new Error("Fissure id is required for deletion!");
    }

    return this.fissureNotficationTrackerRepository.delete(fissureId);
  }

  async getAllUnsentFissuresIds() {
    return this.fissureNotficationTrackerRepository.selectUnsentFissures();
  }

  async markSent(fissureId) {
    if (!fissureId) {
      throw new Error("Fissure id is required for update!");
    }

    return this.fissureNotficationTrackerRepository.updateNotificationSent(
      fissureId,
    );
  }
}

export default FissureNotficationTrackerService;
