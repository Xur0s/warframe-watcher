import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import TabBarBackground from "./TabBarBackground";
import { SafeAreaView } from "react-native-safe-area-context";
import { vectors } from "@/constants/vectors";

const icons_map = {
  missions: vectors.mission_icon,
  add: vectors.add_icon,
  settings: vectors.setting_icon,
};

const renderIcon = (iconName: keyof typeof icons_map, isFocused: boolean) => {
  const { width } = useWindowDimensions();
  const icon_width = width * 0.25;

  const Icon = icons_map[iconName];
  if (!Icon) return null;

  return <Icon width={icon_width} />;
};

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View className="flex flex-row absolute bottom-0 right-0 left-0 h-10 mb-14 justify-center items-center">
      <SafeAreaView
        edges={["bottom"]}
        className="absolute z-0 justify-center items-center"
      >
        <View className="absolute z-0 justify-center items-center">
          <TabBarBackground />
        </View>
      </SafeAreaView>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined &&
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : options.title !== undefined && typeof options.title === "string"
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            className="flex justify-center items-center"
          >
            <View className="w-[110] justify-center items-center">
              {renderIcon(route.name as keyof typeof icons_map, isFocused)}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
