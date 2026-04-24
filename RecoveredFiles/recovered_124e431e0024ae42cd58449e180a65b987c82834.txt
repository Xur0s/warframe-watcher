import * as React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { G, Path, Rect } from "react-native-svg";

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedView = Animated.createAnimatedComponent(View);

interface OptionBoxProps {
  Width: number;
  Height: number;
  Title: string;
  Choice?: string;
  getChoice?: () => string;
  AnswerCallBack: (choice: string) => void;
}

const OptionBox = (props: OptionBoxProps) => {
  const getCurrentChoice = (): string => {
    if (props.getChoice) {
      return props.getChoice();
    }

    return props.Choice || "";
  };

  const aspectRatio = 120 / 500;
  const width = props.Width;
  const height = width * aspectRatio;

  const progress = useSharedValue(0);

  const viewAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(progress.value, [0, 1], [1, 1.1]) }],
  }));

  const rightFrameProp = useAnimatedProps(() => ({
    width: interpolate(progress.value, [0, 0.7], [8, 204]),
  }));

  const leftFrameProp = useAnimatedProps(() => ({
    x: interpolate(progress.value, [0, 0.7], [446, 250]),
    width: interpolate(progress.value, [0, 0.7], [8, 204]),
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    color: progress.value > 0.5 ? "black" : "#A2AECB",
  }));

  const handleOnPressIn = () => {
    progress.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });
  };

  const handleOnPressOut = () => {
    progress.value = withTiming(0, {
      duration: 700,
      easing: Easing.out(Easing.exp),
    });
  };

  return (
    <Pressable
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      onPress={() => {
        props.AnswerCallBack(getCurrentChoice());
      }}
    >
      <AnimatedView className="" style={[viewAnimatedStyle]}>
        <Svg width={width} height={height} viewBox="0 0 500 120" fill="none">
          <G id="Option Box">
            <Path
              id="BackBox"
              d="M449.9 20.0996V99.9004H50.0996V20.0996H449.9Z"
              fill="black"
              stroke="#A2AECB"
              strokeWidth={0.2}
            />
            <AnimatedRect
              id="RightFrame"
              x={46}
              y={20}
              height={80}
              fill="#A2AECB"
              animatedProps={rightFrameProp}
            />
            <AnimatedRect
              id="LeftFrame"
              y={20}
              height={80}
              fill="#A2AECB"
              animatedProps={leftFrameProp}
            />
          </G>
        </Svg>
        <View className="absolute justify-center items-center w-full h-full">
          <AnimatedText
            className="font-roboto-semiBold"
            style={[{ letterSpacing: 3, fontSize: 18 }, textAnimatedStyle]}
          >
            {props.Title.toUpperCase()}
          </AnimatedText>
        </View>
      </AnimatedView>
    </Pressable>
  );
};

export default OptionBox;
