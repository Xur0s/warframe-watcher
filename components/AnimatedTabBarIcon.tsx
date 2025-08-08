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

const AnimatedTabBarIcon = ({
  IconPath,
  isFocused,
}: {
  IconPath: string;
  isFocused: boolean;
}) => {
  const { width } = useWindowDimensions();
  const icon_width = width * 0.2;

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(isFocused ? 1 : 0, { duration: 250 });
  }, [isFocused]);

  const animatedPropsRect = useAnimatedProps(() => ({
    height: interpolate(progress.value, [0, 1], [0, -49]),
  }));

  const animatedPropsFill = useAnimatedProps(() => ({
    fill: interpolateColor(progress.value, [0, 1], ["#3D4879", "#A2AECB"]),
  }));

  return (
    <Svg width={icon_width} height={icon_width} viewBox="0 0 80 49" fill="none">
      <G id="Mission Icon">
        <AnimatedRect
          id="BackBox"
          animatedProps={animatedPropsRect}
          width={80}
          fill="#3D4879"
          y={49}
        />
        <AnimatedPath
          id="Border"
          animatedProps={animatedPropsFill}
          d="M60.352 24.4985L39.9985 44.8521L19.645 24.4985L39.9985 4.14502L60.352 24.4985ZM20.352 24.4985L39.9985 44.145L59.645 24.4985L39.9985 4.85205L20.352 24.4985ZM58.7055 24.4985L39.9985 43.2056L21.2915 24.4985L39.9985 5.7915L58.7055 24.4985ZM22.7055 24.4985L39.9985 41.7915L57.2915 24.4985L39.9985 7.20557L22.7055 24.4985Z"
        />
        <AnimatedPath
          id="Icon"
          animatedProps={animatedPropsFill}
          d={IconPath}
        />
      </G>
    </Svg>
  );
};

export default AnimatedTabBarIcon;
