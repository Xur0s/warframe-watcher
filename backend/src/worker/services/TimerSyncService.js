import axios from "axios";
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
      const response = await axios.get(
        "https://api.warframestat.us/pc/fissures"
      );
      const timerData = response.data.map((timer) => {
        const [nodePart, planetPart] = timer.node.split(" (");
        const node = nodePart ? nodePart : null;
        const planet = planetPart ? planetPart.replace(")", "") : null;
        const isExpired = new Date() > timer.expiry;
        return {
          id: timer.id,
          activation: timer.activation,
          expiry: timer.expiry,
          planet: planet,
          node: node,
          enemy_faction: timer.enemy,
          mission_type: timer.missionType,
          tier: timer.tier,
          expired: isExpired,
          isStorm: timer.isStorm,
          isHard: timer.isHard,
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
