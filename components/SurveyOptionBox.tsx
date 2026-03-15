import React, { useEffect, useState } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { G, Rect, Text, TSpan } from "react-native-svg";
import { scheduleOnRN } from "react-native-worklets";
import SubOption from "./SubChoiceOptionBox";

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedG = Animated.createAnimatedComponent(G);
const AnimatedTSpan = Animated.createAnimatedComponent(TSpan);
const AnimatedText = Animated.createAnimatedComponent(Text);

export const OptionBox = () => {
  const [isFocused, setIsFocused] = useState(false);
  const progress = useSharedValue(0);

  const [animationOver, setAnimationOver] = useState(false);

  useEffect(() => {
    setAnimationOver(false);
    progress.value = withTiming(
      isFocused ? 1 : 0,
      { duration: 400 },
      (finished) => {
        if (finished) {
          scheduleOnRN(setAnimationOver, isFocused);
        }
      },
    );
  }, [isFocused]);

  const backRectProps = useAnimatedProps(() => ({
    y: interpolate(progress.value, [0, 1], [170.459, 12.9174]),
    fill: interpolateColor(progress.value, [0, 1], ["black", "#A2AECB"]),
    strokeWidth: interpolate(progress.value, [0, 1], [0.917361, 1.83473]),
  }));

  const bottomRectProps = useAnimatedProps(() => ({
    y: interpolate(progress.value, [0, 1], [237.273, 79.3058]),
    height: interpolate(progress.value, [0, 1], [6.11573, 322.302]),
    fill: interpolateColor(progress.value, [0, 1], ["#A2AECB", "black"]),
    stroke: interpolateColor(progress.value, [0, 1], ["#A2AECB", "#A2AECB"]),
    strokeWidth: interpolate(progress.value, [0, 1], [0, 1]),
  }));

  const tspanProps = useAnimatedProps(() => ({
    y: interpolate(progress.value, [0, 1], [215.684, 59.1389]),
  }));

  const textProps = useAnimatedProps(() => ({
    fill: isFocused ? "black" : "#A2AECB",
  }));

  const gAnimatedProps = useAnimatedProps(() => {
    return {
      transform: [
        { translateX: 207.5 },
        {
          translateY: isFocused
            ? progress.value == 1
              ? 0
              : interpolate(progress.value, [0, 1], [-155, 0])
            : progress.value == 0
              ? 207.5
              : interpolate(progress.value, [0, 1], [52.5, 207.5]),
        },
        { scale: isFocused ? 1 : progress.value == 0 ? 4 : 1 },
        { translateX: -207.5 },
        { translateY: isFocused ? 0 : -207.5 },
      ],
    };
  });

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const svgWidth = 342;
  const svgHeight = 72;

  const aspectRatio = svgHeight / svgWidth;
  const width = screenWidth;
  const height = width;

  const viewAnimatedStyle = useAnimatedStyle(() => ({
    width: width,
    height: isFocused ? height : progress.value == 0 ? height * 0.25 : height,
    transform: [{ scale: 1 }],
  }));

  const turnOn = () => {
    if (!isFocused) setIsFocused(!isFocused);
  };
  const toggleFocus = () => {
    setIsFocused(!isFocused);
  };

  const data = Array.from({ length: 8 }, (_, i) => ({
    id: i.toString(),
  }));

  const blockParentScroll = Gesture.Native().disallowInterruption(true);

  return (
    <Animated.View className=" bg-red-500" style={[viewAnimatedStyle]}>
      <View
        className=""
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Svg width="100%" height="100%" viewBox="0 0 415 415" fill="none">
          <AnimatedG id="Option Box" animatedProps={gAnimatedProps}>
            <AnimatedRect
              id="BackRect"
              x={36.4587}
              width={341.564}
              height={72.4714}
              stroke="#A2AECB"
              animatedProps={backRectProps}
              onPress={toggleFocus}
            />
            <AnimatedRect
              id="BottomRect"
              x={36.0001}
              width={342.481}
              animatedProps={bottomRectProps}
              onPress={turnOn}
              pointerEvents={isFocused ? "none" : "auto"}
            />
            <AnimatedText
              id="OptionName"
              fontFamily="Roboto Mono"
              fontSize={24.463}
              fontWeight="bold"
              letterSpacing="0.2em"
              animatedProps={textProps}
            >
              <AnimatedTSpan x={169.905} animatedProps={tspanProps}>
                {"LITH"}
              </AnimatedTSpan>
            </AnimatedText>
          </AnimatedG>
        </Svg>
      </View>
      {animationOver && (
        <View
          className="absolute bg-yellow-400"
          style={{
            top: height * 0.232,
            height: height * 0.6,
            right: 0,
            left: 0,
          }}
        >
          <GestureDetector gesture={blockParentScroll}>
            <FlatList
              style={{ height: "100%" }}
              contentContainerClassName="relative gap-3"
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={() => (
                <View style={{}}>
                  <SubOption />
                </View>
              )}
            />
          </GestureDetector>
        </View>
      )}
    </Animated.View>
  );
};
