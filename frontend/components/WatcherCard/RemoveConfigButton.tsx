import { useStoreSelectors } from "@/store/userConfigStore";
import * as React from "react";
import { Pressable, useWindowDimensions, View } from "react-native";
import Animated, {
    Easing,
    interpolateColor,
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import Svg, { G, Path, Rect } from "react-native-svg";

type RemoveConfigButtonProps = {
  id: string;
};

const RemoveConfigButton = (props: RemoveConfigButtonProps) => {
  const { width: screeenWidth, height: screenHeight } = useWindowDimensions();
  const width = screeenWidth * 0.12;
  const height = screeenWidth;

  const removeConfig = useStoreSelectors.use.deleteConfig();

  const progress = useSharedValue(0);
  const AnimatedRect = Animated.createAnimatedComponent(Rect);
  const AnimatedPath = Animated.createAnimatedComponent(Path);

  const animatedRectProp = useAnimatedProps(() => ({
    fill: interpolateColor(progress.value, [0, 1], ["#A2AECB", "white"]),
  }));
  const animatedPathProp = useAnimatedProps(() => ({
    fill: interpolateColor(progress.value, [0, 1], ["white", "#A2AECB"]),
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
    <View>
      <Pressable
        onPress={() => removeConfig(props.id)}
        onPressIn={handleOnPressIn}
        onPressOut={handleOnPressOut}
      >
        <Svg width={width} height={height} viewBox="0 0 200 200" fill="none">
          <G id="Close-Button">
            <AnimatedRect
              id="OuterFrame"
              x={41}
              y={41}
              width={118}
              height={118}
              stroke="white"
              strokeWidth={2}
              animatedProps={animatedRectProp}
            />
            <Rect
              id="InnerFrame"
              x={46.5}
              y={46.5}
              width={107}
              height={107}
              stroke="white"
              strokeWidth={5}
            />
            <G id="Cross">
              <AnimatedPath
                id="Rectangle1"
                d="M66.8744 125.606L125.606 66.8745L131.479 68.3427L132.947 74.2159L74.2158 132.947L68.3427 131.479L66.8744 125.606Z"
                animatedProps={animatedPathProp}
              />
              <AnimatedPath
                id="Rectangle2"
                d="M125.922 133.082L67.1903 74.3508L68.6586 68.4776L74.5318 67.0093L133.263 125.741L131.795 131.614L125.922 133.082Z"
                animatedProps={animatedPathProp}
              />
            </G>
          </G>
        </Svg>
      </Pressable>
    </View>
  );
};
export default RemoveConfigButton;
