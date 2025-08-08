import React from "react";
import { Tabs } from "expo-router";
import MissionTabBar from "@/components/MissionTabBar";

const _layout = () => {
  return (
    <Tabs
      tabBar={(props) => <MissionTabBar {...props} />}
      screenOptions={{ tabBarShowLabel: false }}
    >
      <Tabs.Screen
        name="(fissures)"
        options={{
          title: "Fissures",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="invasions"
        options={{
          title: "Invasions",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          title: "Timer",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default _layout;
