import { View, Text, useWindowDimensions } from "react-native";
import React, { use, useEffect } from "react";
import Svg, { G, Path, Rect } from "react-native-svg";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

interface TabBarIcon {
  iconPath: string;
  textPath: string;
  width: number;
  height: number;
  isFocused: boolean;
}

const AnimatedMissionTabBarIcon = ({
  iconPath,
  textPath,
  width,
  height,
  isFocused,
}: TabBarIcon) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(isFocused ? 1 : 0, { duration: 250 });
  }, [isFocused]);

  const animatedPropsRect = useAnimatedProps(() => ({
    height: interpolate(progress.value, [0, 1], [-4, -1 * (height + 2)]),
  }));

  const animatedPropFill = useAnimatedProps(() => ({
    fill: interpolateColor(progress.value, [0, 1], ["#3D4879", "#A2AECB"]),
  }));

  return (
    <Svg width={width} height={height} viewBox="0 0 122 34" fill="none">
      <G id="IconBox">
        <Rect
          id="BlackBox"
          x="0.1"
          y="0.1"
          width={122}
          height={34}
          fill="black"
          stroke="#3D4879"
          stroke-width="0.2"
        />
        <AnimatedRect
          id="BlueBox"
          animatedProps={animatedPropsRect}
          y="34"
          width="122"
          height="-4"
          fill="#3D4879"
        />
        <AnimatedPath id="Text" animatedProps={animatedPropFill} d={textPath} />
        <AnimatedPath id="Icon" animatedProps={animatedPropFill} d={iconPath} />
      </G>
    </Svg>
  );
};

export default AnimatedMissionTabBarIcon;
