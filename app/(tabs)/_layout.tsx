import React from "react";
import { Tabs } from "expo-router";
import type { BottomTabsProps } from "react-native-screens";
import TabBar from "@/components/TabBar";

const _layout = () => {
  return (
    <Tabs
      tabBar={(props: BottomTabsProps) => <TabBar {...props} />}
      screenOptions={{ tabBarShowLabel: false }}
    >
      <Tabs.Screen
        name="(missions)"
        options={{
          title: "Missions",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Watcher",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default _layout;
