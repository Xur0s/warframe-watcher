import FissureTabBar from "@/components/FissureTabBar";
import { Tabs } from "expo-router";
import React from "react";
import { BottomTabsProps } from "react-native-screens";

const _layout = () => {
  return (
    <Tabs
      initialRouteName="normal"
      tabBar={(props: BottomTabsProps) => <FissureTabBar {...props} />}
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
