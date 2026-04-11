import * as React from "react";
import { useWindowDimensions, View } from "react-native";
import Svg, { G, Path, Text, TSpan } from "react-native-svg";

const TextBox = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const aspectRatio = 240 / 1080;
  const width = screenWidth * 1.5;
  const height = screenWidth * 0.3;

  return (
    <View className="bg-red-500">
      <Svg width={width} height={height} viewBox="0 0 1080 240" fill="none">
        <G id="Text Box">
          <Path
            id="MainBox"
            d="M959.382 41L998.882 120L959.382 199H120.618L81.1182 120L120.618 41H959.382Z"
            fill="#363636"
            stroke="#A2AECB"
            strokeWidth={2}
          />
          <Path
            id="RightFrame"
            d="M1047 120L966.5 200L1006.5 120L966.5 40L1047 120Z"
            fill="#A2AECB"
          />
          <Path
            id="LeftFrame"
            d="M33 120L113.5 200L73.5 120L113.5 40L33 120Z"
            fill="#A2AECB"
          />
          <Text
            id="Text"
            fill="white"
            fontFamily="Roboto Flex"
            fontSize={70}
            fontWeight={500}
            letterSpacing="0em"
          >
            <TSpan x={323.608} y={143.926}>
              {"Cosmic Horrors"}
            </TSpan>
          </Text>
        </G>
      </Svg>
    </View>
  );
};
export default TextBox;
