import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import TabBar from "@/components/TabBar";
import TabBarBackground from "@/components/TabBarBackground";

const _layout = () => {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ tabBarShowLabel: false }}
    >
      <Tabs.Screen
        name="missions"
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
