import React from "react";
import { Tabs } from "expo-router";
import MissionTabBar from "@/components/MissionTabBar";
import FissureTabBar from "@/components/FissureTabBar";

const _layout = () => {
  return (
    <Tabs
      tabBar={(props) => <FissureTabBar {...props} />}
      screenOptions={{ tabBarShowLabel: false }}
    >
      <Tabs.Screen
        name="normal"
        options={{
          title: "Normal",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="steelPath"
        options={{
          title: "Steel_Path",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="voidStorm"
        options={{
          title: "Void_Storm",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default _layout;
