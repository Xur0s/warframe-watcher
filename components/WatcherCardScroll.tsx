import { useConfigsStorage } from "@/hooks/useConfigsStorage";
import React, { useEffect, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import WatcherCard from "./WatcherCard";

type Config = {
  id: string;
  configName?: string;
  difficulty?: string;
  relic?: string;
  missionType?: string;
  planet?: string;
  node?: string;
  isActive?: boolean;
};

const WatcherCardScroll = () => {
  const [configs, setConfigs] = useState<Config[]>([]);
  const { configs: surveyConfig, refreshConfig } = useConfigsStorage();

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const width = screenWidth;
  const height = screenHeight * 0.6;

  function normalizeSurveyConfigData(item: any) {
    if (!item.id) {
      throw new Error("Config data is missing an id");
    } else if (typeof item.id != "string") {
      throw new Error("Config data id is not of type str");
    }

    return {
      id: item.id,
      configName:
        item.configName && typeof item.configName === "string"
          ? item.configName
          : "N/A",
      difficulty:
        item.difficulty && typeof item.difficulty === "string"
          ? item.difficulty
          : "N/A",
      relic: item.relic && typeof item.relic === "string" ? item.relic : "N/A",
      missionType:
        item.missionType && typeof item.missionType === "string"
          ? item.missionType
          : "N/A",
      planet:
        item.planet && typeof item.planet === "string" ? item.planet : "N/A",
      node: item.node && typeof item.node === "string" ? item.node : "N/A",
      isActive:
        item.isActive && typeof item.isActive === "boolean"
          ? item.isActive
          : false,
    };
  }

  useEffect(() => {
    const configArray = [...surveyConfig.values()].map(
      normalizeSurveyConfigData,
    );
    setConfigs(configArray);
  }, [surveyConfig]);

  return (
    <View
      className="bg-red-500"
      style={{
        bottom: screenHeight * 0.03,
        width: width,
        height: height,
      }}
    >
      <FlatList
        data={configs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <WatcherCard
              id={item.id}
              name={item.configName}
              difficulty={item.difficulty}
              relic={item.relic}
              mission={item.missionType}
              planet={item.planet}
              pNode={item.node}
              isActive={item.isActive}
            />
          </View>
        )}
      />
    </View>
  );
};

export default WatcherCardScroll;
