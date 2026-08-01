import { redisClient } from "../../redis/index.js";
import worldstateData from "warframe-worldstate-data";

class FissureService {
  constructor(fissureRepository) {
    this.fissureRepository = fissureRepository;

    this.lastSyncDate = null;
    this.syncCount = 0;
  }

  async getFissures() {
    try {
      const response = await fetch(
        "https://api.warframe.com/cdn/worldState.php",
      );
      const worldState = await response.json();

      const fissureData = [
        ...worldState.ActiveMissions.map((mission) => {
          const id = mission._id.$oid;
          const node = worldstateData.solNodes[mission.Node].value;
          const enemy = worldstateData.solNodes[mission.Node].enemy;
          const type =
            mission.MissionType === "MT_CORRUPTION"
              ? "Void Flood"
              : worldstateData.missionTypes[mission.MissionType].value;
          const tier = worldstateData.fissureModifiers[mission.Modifier].value;
          const activation = new Date(
            parseInt(mission.Activation.$date.$numberLong),
          );
          const expiry = new Date(parseInt(mission.Expiry.$date.$numberLong));
          const is_hard = mission.Hard ? mission.Hard : false;

          const [nodePart, planetPart] = node.split(" (");
          const planetNode = nodePart ? nodePart : null;
          const planet = planetPart ? planetPart.replace(")", "") : null;
          const isExpired = new Date() > expiry;

          return {
            id: id,
            activation: activation,
            expiry: expiry,
            planet: planet,
            node: planetNode,
            enemy_faction: enemy,
            mission_type: type,
            tier: tier,
            expired: isExpired,
            is_storm: false,
            is_hard: is_hard,
          };
        }),

        ...worldState.VoidStorms.map((mission) => {
          const id = mission._id.$oid;
          const node = worldstateData.solNodes[mission.Node].value;
          const enemy = worldstateData.solNodes[mission.Node].enemy;
          const type = worldstateData.solNodes[mission.Node].type;
          const tier =
            worldstateData.fissureModifiers[mission.ActiveMissionTier].value;
          const activation = new Date(
            parseInt(mission.Activation.$date.$numberLong),
          );
          const expiry = new Date(parseInt(mission.Expiry.$date.$numberLong));
          const [nodePart, planetPart] = node.split(" (");
          const planetNode = nodePart ? nodePart : null;
          const planet = planetPart ? planetPart.replace(")", "") : null;
          const isExpired = new Date() > expiry;

          return {
            id: id,
            activation: activation,
            expiry: expiry,
            planet: planet,
            node: planetNode,
            enemy_faction: enemy,
            mission_type: type,
            tier: tier,
            expired: isExpired,
            is_storm: true,
            is_hard: false,
          };
        }),
      ];

      let fissuresInserted = 0;
      for (const fissure of fissureData) {
        const expiryDate = new Date(fissure.expiry);
        const msTTL = Math.max(0, expiryDate.getTime() - Date.now());
        const secondsTTL = Math.ceil(msTTL / 1000);

        if (msTTL <= 0) continue;

        // Postgres
        const insertFissure = await this.fissureRepository.insert(fissure);
        const result = insertFissure ?? null;
        if (result.length > 0) {
          fissuresInserted++;
        }

        // Redis
        const multi = await redisClient.setEx(
          `fissures:${fissure.id}`,
          secondsTTL,
          JSON.stringify(fissure),
        );
      }
      this.lastSyncDate = new Date();
      this.syncCount++;

      console.log("Fissure Service Log:Sync successful", {
        "Fissures inserted": fissuresInserted,
        "Sync date": this.lastSyncDate,
        "Sync count": this.syncCount,
      });

      // Return if successful
      return {
        success: true,
        upserted: fissuresInserted,
        lastSyncDate: this.lastSyncDate,
        syncCount: this.syncCount,
      };
    } catch (err) {
      console.error("Sync failed", { err });

      return {
        success: false,
        error: err.message,
      };
    }
  }

  async getEarliestExpireTime() {
    const expiry = await this.fissureRepository.selectEarliestExpiry();
    console.log("Postgres expiry:", { "Next expiry": expiry });

    return expiry ?? null;
  }

  async expireFissures() {
    const updateExpiredFissures = await this.fissureRepository.updateExpiry();
    const result = updateExpiredFissures ? updateExpiredFissures : null;

    if (result) {
      console.log("Successfully expired fissures", {
        "Expired fissures count": updateExpiredFissures.length,
      });
    }

    return result;
  }

  async getStatus() {
    return {
      lastSyncDate: this.lastSyncDate,
      syncCount: this.syncCount,
    };
  }
}

export default FissureService;
