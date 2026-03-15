import TabBar from "@/components/TabBar";
import { Tabs } from "expo-router";
import React from "react";
import type { BottomTabsProps } from "react-native-screens";

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
        name="(add)"
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
