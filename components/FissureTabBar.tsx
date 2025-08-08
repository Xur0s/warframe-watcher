import {
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { vectors } from "@/constants/vectors";
import voidStorm from "@/app/(tabs)/(missions)/(fissures)/voidStorm";

const icons_map = {
  normal: {
    unfocused: vectors.normal_tab,
    focused: vectors.focused_normal_tab,
  },
  steelPath: {
    unfocused: vectors.steel_path_tab,
    focused: vectors.focused_steel_path_tab,
  },
  voidStorm: {
    unfocused: vectors.void_storm_tab,
    focused: vectors.focused_void_storm_tab,
  },
};

const FissureTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const renderIcon = (iconName: keyof typeof icons_map, isFocused: boolean) => {
    const svgWidth = 110;
    const svgHeight = 18;
    const aspectRatio = svgWidth / svgHeight;

    const width = screenWidth * 0.27;
    const height = width / aspectRatio;

    if (!isFocused) {
      const TabButton = icons_map[iconName].unfocused;

      if (!TabButton) return null;

      return <TabButton width={width} />;
    }

    if (isFocused) {
      const TabButton = icons_map[iconName].focused;

      if (!TabButton) return null;

      return <TabButton width={width} />;
    }
  };

  const renderFissureTabBar = () => {
    const svgWidth = 370;
    const svgHeight = 29;
    const aspectRatio = svgHeight / svgWidth;

    const width = screenWidth;
    const height = width * aspectRatio;

    const TabBar = vectors.fissure_tab_bar;

    if (!TabBar) return null;

    return <TabBar width={width} height={height} />;
  };

  return (
    <View className="flex-row absolute top-0 right-0 left-0 justify-center items-center mt-28">
      <View className="absolute justify-center items-center">
        {renderFissureTabBar()}
      </View>
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
            key={`missions-${route.key}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            className="justify-center items-center"
          >
            {renderIcon(route.name as keyof typeof icons_map, isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default FissureTabBar;
