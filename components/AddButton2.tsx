import {
  Canvas,
  LinearGradient as CanvasLinearGradient,
  Path as CanvasPath,
  fitbox,
  Group,
  interpolateColors,
  rect,
  vec,
} from "@shopify/react-native-skia";
import { router } from "expo-router";
import * as React from "react";
import { Pressable, useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { G, Path } from "react-native-svg";

const AddButton = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const svgWidth = 150;
  const svgHeight = 200;
  const aspectRatio = svgHeight / svgWidth;

  const width = screenWidth * 0.38;
  const height = (width * aspectRatio) / 3;

  const progress = useSharedValue(0);

  const graidentPositions = useDerivedValue(() => {
    return [
      0,
      interpolate(progress.value, [0, 1], [0, 0.3]),
      interpolate(progress.value, [0, 1], [1, 0.7]),
      1,
    ];
  });

  const baseStrokeAnimated = useDerivedValue(() => {
    return interpolateColors(progress.value, [0, 0.5], ["#A2AECB", "#BB7DB8"]);
  });

  const AnimatedPath = Animated.createAnimatedComponent(Path);

  const AnimatedPathProp1 = useAnimatedProps(() => ({
    fill: interpolateColor(progress.value, [0, 0.5], ["#A2AECB", "#BB7DB8"]),
    stroke: interpolateColor(progress.value, [0, 0.5], ["#A2AECB", "#BB7DB8"]),
  }));

  const AnimatedPathProp2 = useAnimatedProps(() => ({
    fill: interpolateColor(progress.value, [0, 0.5], ["#A2AECB", "#BB7DB8"]),
  }));

  const viewBox = rect(0, 0, 500, 224);
  const container = rect(0, 0, width, height);
  const transform = fitbox("contain", viewBox, container);

  const handleOnPressIn = () => {
    progress.value = withTiming(1, {
      duration: 400,
      easing: Easing.out(Easing.exp),
    });
  };

  const handleOnPressOut = () => {
    progress.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  };

  return (
    <Pressable
      className="relative"
      style={{ width: width, height: height }}
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      onPress={() => router.push("/survey")}
    >
      <Svg
        style={{ position: "absolute" }}
        width="100%"
        height="100%"
        viewBox="0 0 500 224"
        fill="none"
      >
        <G id="Add">
          <AnimatedPath
            id="RightBackTriangle"
            d="M369.5 205.866L472.26 112L369.5 18.1328V205.866Z"
            animatedProps={AnimatedPathProp1}
          />
          <AnimatedPath
            id="LeftFrame"
            d="M11 111.5L98.0316 32L98 32.5L12 111.5L98.0316 190V191L11 111.5Z"
            animatedProps={AnimatedPathProp1}
          />
          <AnimatedPath
            id="RightFrame"
            d="M488.032 111.5L401 32L401.032 32.5L487.032 111.5L401 190V191L488.032 111.5Z"
            animatedProps={AnimatedPathProp1}
          />
          <AnimatedPath
            id="BackLeftTriangle"
            d="M129.5 205.866L26.7402 112L129.5 18.1328V205.866Z"
            animatedProps={AnimatedPathProp1}
          />
        </G>
      </Svg>

      <Canvas className="absolute" style={{ width: "100%", height: "100%" }}>
        <Group transform={transform}>
          <CanvasPath path="M369 25L464 111.5L369 198H130L35 111.5L130 25H369Z">
            <CanvasLinearGradient
              start={vec(464, 111.5)}
              end={vec(35, 111.5)}
              colors={["#BB7DB8", "black", "black", "#BB7DB8"]}
              positions={graidentPositions}
            />
          </CanvasPath>

          <Group clip={"M369 25L464 111.5L369 198H130L35 111.5L130 25H369Z"}>
            <CanvasPath
              path="M369 25L369.337 24.6303L369.194 24.5H369V25ZM464 111.5L464.337 111.87L464.743 111.5L464.337 111.13L464 111.5ZM369 198V198.5H369.194L369.337 198.37L369 198ZM130 198L129.663 198.37L129.806 198.5H130V198ZM35 111.5L34.6634 111.13L34.2573 111.5L34.6634 111.87L35 111.5ZM130 25V24.5H129.806L129.663 24.6303L130 25ZM369 25L368.663 25.3697L463.663 111.87L464 111.5L464.337 111.13L369.337 24.6303L369 25ZM464 111.5L463.663 111.13L368.663 197.63L369 198L369.337 198.37L464.337 111.87L464 111.5ZM369 198V197.5H130V198V198.5H369V198ZM130 198L130.337 197.63L35.3366 111.13L35 111.5L34.6634 111.87L129.663 198.37L130 198ZM35 111.5L35.3366 111.87L130.337 25.3697L130 25L129.663 24.6303L34.6634 111.13L35 111.5ZM130 25V25.5H369V25V24.5H130V25Z"
              style="fill"
            />
          </Group>
          <CanvasPath
            path="M369 25L464 111.5L369 198H130L35 111.5L130 25H369Z"
            color={baseStrokeAnimated}
            style="stroke"
            strokeWidth={0.8}
          />
        </Group>
      </Canvas>

      <Svg
        style={{ position: "absolute" }}
        width="100%"
        height="100%"
        viewBox="0 0 500 224"
        fill="none"
      >
        <G id="AddIcon">
          <AnimatedPath
            d="M257.571 168.252L249 172L240.429 168.252V123.278H257.571V168.252Z"
            animatedProps={AnimatedPathProp2}
          />
          <AnimatedPath
            d="M309 111.999L304.385 120.57H194.274L189 111.999L194.274 103.428H304.385L309 111.999Z"
            animatedProps={AnimatedPathProp2}
          />
          <AnimatedPath
            d="M257.571 55.748V100.722H240.429V55.748L249 52L257.571 55.748Z"
            animatedProps={AnimatedPathProp2}
          />
        </G>
      </Svg>
    </Pressable>
  );
};
export default AddButton;
