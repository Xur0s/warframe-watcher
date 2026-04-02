import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";

interface Config {
  name: string;
  difficulty: string;
  relic: string;
  mission: string;
  planet: string;
  pNode: string;
}

const CONFIGS_INDEX_KEY = "@alarms_configs_index";
const CONFIG_PREFIX = "@alarm_config_";

export const useAlarmConfigs = () => {
  const [configs, setConfigs] = useState<Config[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Loading all alarms
  const loadAllConfigs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const indexJson = await AsyncStorage.getItem(CONFIGS_INDEX_KEY);
      const configNames = indexJson ? JSON.parse(indexJson) : [];

      const loadedConfigs: Config[] = [];

      for (const name of configNames) {
        const configKey = `${CONFIG_PREFIX}${name}`;
        const configData = await AsyncStorage.getItem(configKey);

        if (configData) {
          loadedConfigs.push({
            ...JSON.parse(configData),
          });
        }
      }

      setConfigs(loadedConfigs);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
        console.error("Failed to load all alarm configs:", err.message);
      } else {
        console.error(
          "Failed to load all alarm configs: Error message could not be found",
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Saving alarm
  const saveConfig = useCallback(async (configData: Config) => {
    try {
      const name = configData.name;

      const indexJson = await AsyncStorage.getItem(CONFIGS_INDEX_KEY);
      const configNames = indexJson ? JSON.parse(indexJson) : [];

      if (configNames.includes(name)) {
        throw new Error(`A configuration with the name ${name} exists already`);
      }

      configNames.push(name);
      await AsyncStorage.setItem(
        CONFIGS_INDEX_KEY,
        JSON.stringify(configNames),
      );

      const configKey = `${CONFIG_PREFIX}${name}`;
      await AsyncStorage.setItem(configKey, JSON.stringify(configData));

      setConfigs((prev) => [...prev, configData]);

      return { success: true };
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
        console.error(
          `Failed to save ${configData.name} alarm config:`,
          err.message,
        );
      } else {
        console.error(
          `Failed to save ${configData.name} alarm config: Error message could not be found`,
        );
      }

      return { success: false };
    }
  }, []);

  // Update alarm
  const updateConfig = useCallback(async (configData: Config) => {
    try {
      const name = configData.name;

      const indexJson = await AsyncStorage.getItem(CONFIGS_INDEX_KEY);
      const configNames = indexJson ? JSON.parse(indexJson) : [];

      if (!configNames.includes(name)) {
        throw new Error(`Failed to find a configuration named ${name}`);
      }

      const configKey = `${CONFIG_PREFIX}${name}`;
      await AsyncStorage.setItem(configKey, JSON.stringify(configData));

      setConfigs((prev) => [...prev, configData]);

      return { success: true };
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
        console.error(
          `Failed to update ${configData.name} alarm config: `,
          err.message,
        );
      } else {
        console.error(
          `Failed to update ${configData.name} alarm config: Error message could not be found`,
        );
      }

      return { success: false };
    }
  }, []);

  const deleteConfig = useCallback(async (name: string) => {
    try {
      const indexJson = await AsyncStorage.getItem(CONFIGS_INDEX_KEY);
      const configNames = indexJson ? JSON.parse(indexJson) : [];

      if (!configNames.includes(name)) {
        throw new Error(`Failed to find a configuration named ${name}`);
      }

      const updatedNames = configNames.filter(
        (configName: string) => configName !== name,
      );

      await AsyncStorage.setItem(
        CONFIGS_INDEX_KEY,
        JSON.stringify(updatedNames),
      );

      const configKey = `${CONFIG_PREFIX}${name}`;
      await AsyncStorage.removeItem(configKey);

      setConfigs((prev) => prev.filter((config) => config.name !== name));
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Failed to delete ${name} alarm config: `, err.message);
      } else {
        console.error(
          `Failed to delete ${name} alarm config: Error message could not be found`,
        );
      }
    }
  }, []);
};
