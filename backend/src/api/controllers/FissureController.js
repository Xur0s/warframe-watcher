class FissureController {
  constructor(fissureService) {
    this.fissureService = fissureService;
  }

  async getAllFissures(req, res, next) {
    try {
      const fissures = this.fissureService.getAllFissures();
      return status.res(200).json(fissures);
    } catch (err) {
      next(err);
    }
  }

  async getNormalFissures(req, res, next) {
    try {
      const fissures = this.fissureService.getNormalFissures();
      return status.res(200).json(fissures);
    } catch (err) {
      next(err);
    }
  }

  async getHardFissures(req, res, next) {
    try {
      const fissures = this.fissureService.getHardFissures();
      return status.res(200).json(fissures);
    } catch (err) {
      next(err);
    }
  }

  async getStormFissures(req, res, next) {
    try {
      const fissures = this.fissureService.getStormFissures();
      return status.res(200).json(fissures);
    } catch (err) {
      next(err);
    }
  }
}

export default FissureController;
