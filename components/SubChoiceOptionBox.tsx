import * as React from "react";
import { useWindowDimensions, View } from "react-native";
import Svg, { G, Rect, Text, TSpan } from "react-native-svg";

const SubOption = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const aspectRatio = 43 / 288;
  const width = screenWidth;
  const height = width * aspectRatio * 0.78;

  return (
    <View className="bg-orange-500">
      <Svg width={width} height={height} viewBox="0 0 288 43" fill="none">
        <G id="Sub Choice Box">
          <Rect
            id="Container"
            x={3.6692}
            y={3.66968}
            width={280.103}
            height={35.4715}
            rx={17.7358}
            fill="black"
            stroke="white"
            strokeWidth={1.22316}
          />
          <Text
            id="ChoiceTitle"
            fill="white"
            fontFamily="Roboto Mono"
            fontSize={18.3473}
            fontWeight="bold"
            letterSpacing="0.2em"
          >
            <TSpan x={93.9961} y={28.3}>
              {"Everest"}
            </TSpan>
          </Text>
        </G>
      </Svg>
    </View>
  );
};
export default SubOption;
