class FissureNotficationService {
  constructor(fissureNotficationRepository) {
    this.fissureNotficationRepository = fissureNotficationRepository;
  }

  async insertFissure(fissureId) {
    if (!fissureId) {
      throw new Error("Fissure id is required for insertion!");
    }

    return this.fissureNotficationRepository.insert(fissureId);
  }

  async deleteFissure(fissureId) {
    if (!fissureId) {
      throw new Error("Fissure id is required for deletion!");
    }

    return this.fissureNotficationRepository.delete(fissureId);
  }

  async getAllUnsentFissuresIds() {
    return this.fissureNotficationRepository.selectUnsentFissures();
  }

  async markSent(fissureId) {
    if (!fissureId) {
      throw new Error("Fissure id is required for update!");
    }

    return this.fissureNotficationRepository.updateNotificationSent(fissureId);
  }
}

export default FissureNotficationService;
