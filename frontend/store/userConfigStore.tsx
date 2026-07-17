import { questionResult } from "@/types/question";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSelectors } from "./createSelectors";

type configStore = {
  configs: Record<string, questionResult>;
  addConfig: (config: questionResult) => void;
  updateConfig: (id: string, config: questionResult) => void;
  deleteConfig: (id: string) => void;
  clearAllConfigs: () => void;
};

export const storeWatcherConfig = create<configStore>()(
  persist(
    // Store Actions
    (set) => ({
      configs: {},

      addConfig: (config) =>
        set((state) => {
          const id = uuid.v4();

          console.log(`Adding: ${id}: ${config}`);
          return {
            configs: { ...state.configs, [id]: config },
          };
        }),

      updateConfig: (id, config) =>
        set((state) => {
          if (!state.configs[id]) {
            console.warn(
              "Watcher configuration id doesn't exists: Unable to update configuration",
            );
            return state;
          }

          return {
            configs: { ...state.configs, config },
          };
        }),

      deleteConfig: (id) =>
        set((state) => {
          if (!state.configs[id]) {
            console.warn(
              "Watcher configuration id doesn't exists: Unable to delete configuration",
            );
            return state;
          }

          const newConfigs = { ...state.configs };
          delete newConfigs[id];
          return { configs: newConfigs };
        }),

      clearAllConfigs: async () => {
        await AsyncStorage.clear();
        set({ configs: {} }); // reset in-memory state too
      },
    }),

    // Storage Actions
    {
      name: "config-storage",
      storage: {
        getItem: async (name) => {
          const getConfig = await AsyncStorage.getItem(name);
          const config = getConfig ? JSON.parse(getConfig) : null;

          return config;
        },

        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },

        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    },
  ),
);

export const useStoreSelectors = createSelectors(storeWatcherConfig);
