import * as React from "react";
import { Pressable, useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { G, Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface BackArrowProps {
  goBack: () => void;
}

const BackArrow = (props: BackArrowProps) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const width = screenWidth * 0.19;
  const height = width;

  const progress = useSharedValue(0);

  const animatedArrowProp = useAnimatedProps(() => ({
    fill: interpolateColor(progress.value, [0, 1], ["#A2AECB", "black"]),
    stroke: interpolateColor(progress.value, [0, 1], ["#A2AECB", "black"]),
  }));

  const animatedInnerFrame = useAnimatedProps(() => ({
    fill: interpolateColor(progress.value, [0, 1], ["black", "#A2AECB"]),
  }));

  const handleOnPressIn = () => {
    progress.value = withTiming(1, {
      duration: 250,
      easing: Easing.out(Easing.exp),
    });
  };

  const handleOnPressOut = () => {
    progress.value = withTiming(0, {
      duration: 250,
      easing: Easing.out(Easing.exp),
    });
  };

  return (
    <Pressable
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      onPress={() => {
        props.goBack();
      }}
    >
      <Animated.View className="">
        <Svg width={width} height={height} viewBox="0 0 71 71" fill="none">
          <G id="BackArrow">
            <AnimatedPath
              id="Inner-frame"
              d="M3.88208 35.1375L35.1375 3.88208L66.3929 35.1375L35.1375 66.3929L3.88208 35.1375Z"
              animatedProps={animatedInnerFrame}
              stroke="#A2AECB"
              strokeWidth={1.73643}
            />
            <Path
              id="Outer-frame"
              d="M0.409302 35.1374L35.1376 0.40918L69.8658 35.1374L35.1376 69.8657L0.409302 35.1374Z"
              stroke="#A2AECB"
              strokeWidth={0.578809}
            />
            <AnimatedPath
              id="Arrow"
              d="M30.6757 26.8953L20.5243 35.49L20.2909 35.6873L20.5243 35.8845L30.6757 44.4783H25.3661L15.035 35.6863L25.3661 26.8953H30.6757ZM53.7714 33.7644L56.2391 35.8669L53.7714 37.9695H27.6356L25.1659 35.8669L27.6425 33.7644H53.7714Z"
              animatedProps={animatedArrowProp}
              strokeWidth={0.516415}
            />
          </G>
        </Svg>
      </Animated.View>
    </Pressable>
  );
};
export default BackArrow;
