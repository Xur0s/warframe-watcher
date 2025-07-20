import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from "react-native-svg";

const BottomGradient = () => {
  const { width } = useWindowDimensions();
  const aspectRatio = 255 / 412;
  const height = width * aspectRatio;

  return (
    <View className="absolute bottom-0 left-0" style={{ width, height }}>
      <Svg
        width={width}
        height={height}
        fill="none"
        viewBox={`0 0 ${width} ${height}`}
      >
        <Path fill="url(#a)" d={`M0 0H${width}V${height}H0z`} />
        <Defs>
          <LinearGradient id="a" x1="100%" y1="0%" x2="100%" y2="100%">
            <Stop offset={0} stopColor="#05060A" stopOpacity={0} />
            <Stop offset={0.36} stopColor="#010411" stopOpacity={1} />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
};

export default BottomGradient;
