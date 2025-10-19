import axios from "axios";
import worldstateData from "warframe-worldstate-data";
import TimerWorkerModel from "../models/workerModel.js";
import { redisClient } from "../db/redis.js";
import RedisServices from "./RedisService.js";
import logger from "../../logger.js";

class createTimer {
  constructor() {
    this.lastSyncDate = null;
    this.syncCount = 0;
  }

  async getTimers() {
    try {
      const response = await fetch(
        "https://api.warframe.com/cdn/worldState.php"
      );
      const worldState = await response.json();

      const timerData = worldState.ActiveMissions.map((mission) => {
        const id = mission._id.$oid;
        const node = worldstateData.solNodes[mission.Node].value;
        const enemy = worldstateData.solNodes[mission.Node].enemy;
        const type =
          mission.MissionType == "MT_CORRUPTION"
            ? "Void Flood"
            : worldstateData.missionTypes[mission.MissionType].value;
        const tier = worldstateData.fissureModifiers[mission.Modifier].value;
        const activation = new Date(
          parseInt(mission.Activation.$date.$numberLong)
        );
        const expiry = new Date(parseInt(mission.Expiry.$date.$numberLong));
        const isHard = mission.Hard ? mission.Hard : false;

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
          isStorm: false,
          isHard: isHard,
        };
      });

      let timersInserted = 0;
      for (const timer of timerData) {
        const expiryDate = new Date(timer.expiry);
        const msTTL = Math.max(0, expiryDate.getTime() - Date.now());
        const secondsTTL = Math.ceil(msTTL / 1000);

        if (msTTL <= 0) continue;
        if (timer.isHard || timer.isStorm) continue;

        // Postgres
        const insertTimer = await TimerWorkerModel.insert(timer);
        const result = insertTimer ? insertTimer : null;
        if (result.length > 0) {
          timersInserted++;
        }

        // Redis
        const multi = redisClient.multi();
        multi.setEx(`fissures:${timer.id}`, secondsTTL, JSON.stringify(timer));
        multi.zAdd("fissures:expires", {
          score: Math.floor(expiryDate.getTime() / 1000),
          value: timer.id,
        });
        await multi.exec();
      }

      this.lastSyncDate = new Date();
      this.syncCount++;

      logger.info(
        {
          timersInserted: timersInserted,
          syncDate: this.lastSyncDate,
          syncCount: this.syncCount,
        },
        "Sync successful"
      );

      return {
        success: true,
        upserted: timersInserted,
        lastSyncDate: this.lastSyncDate,
        syncCount: this.syncCount,
      };
    } catch (err) {
      logger.error({ err }, "Sync failed");

      return {
        success: false,
        error: err.message,
      };
    }
  }

  async getEarliestExpireTime() {
    logger.info("Seaching for earliest expiry time");

    const fetchFromPostgres = async () => {
      const expiry = await TimerWorkerModel.selectEarliestExpiry();
      logger.info({ nextExpiry: expiry }, "Cache Miss > Postgres expiry");

      return expiry ?? null;
    };

    try {
      const redisQuery = await redisClient.zRange("fissures:expires", 0, 0, {
        WITHSCORES: true,
      });

      const redisGetTimer = await redisClient.get(`fissures:${redisQuery}`);
      const redisParsedTimer = JSON.parse(redisGetTimer);

      const expiry = redisParsedTimer.expiry;

      if (!expiry) {
        throw new Error("Expiry is null");
      }

      logger.info({ nextExpiry: expiry }, "Cache Hit > Redis expiry");

      return expiry ?? null;
    } catch (err) {
      logger.error(
        { err },
        "Redis expiry lookup failed > Looking into Postgress"
      );
      return fetchFromPostgres();
    }
  }

  async expireTimers() {
    // Redis
    const currentTime = Math.floor(Date.now() / 1000);
    const redisRemovedCount = await redisClient.zRemRangeByScore(
      "fissures:expires",
      "-inf",
      currentTime
    );

    // Postgres
    const updateExpiredTimers = await TimerWorkerModel.updateExpiry();
    const result = updateExpiredTimers ? updateExpiredTimers : null;

    if (result) {
      logger.info(
        {
          markedExpiredTimerCount: updateExpiredTimers.length,
          redisRemovedTimerCount: redisRemovedCount,
        },
        "Successfully expired timers"
      );
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

export default createTimer;
