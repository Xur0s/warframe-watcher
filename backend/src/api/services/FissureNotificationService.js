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

  async hasFissure(fissureId) {
    if (!fissureId) {
      throw new Error("Fissure id is required for selection!");
    }

    try {
      const res = await this.fissureNotficationRepository.select(fissureId);

      return res ? true : false;
    } catch (err) {
      console.error("SQL selection failed:", err);

      return false;
    }
  }
}

export default FissureNotficationService;
