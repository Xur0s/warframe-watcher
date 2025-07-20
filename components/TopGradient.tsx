import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

const TopGradient = () => {
  const { width } = useWindowDimensions();
  const aspectRatio = 235 / 412;
  const height = width * aspectRatio;

  return (
    <View className="absolute top-0 left-0" style={{ width, height }}>
      <Svg
        width={width}
        height={height}
        fill="none"
        viewBox={`0 0 ${width} ${height}`}
      >
        <Path fill="url(#a)" d={`M0 0H${width}V${height}H0z`} />
        <Defs>
          <LinearGradient id="a" x1="0%" y1="100%" x2="0%" y2="0%">
            <Stop offset={0} stopColor="#05060A" stopOpacity={0} />
            <Stop offset={0.5} stopColor="#010411" stopOpacity={1} />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
};

export default TopGradient;
