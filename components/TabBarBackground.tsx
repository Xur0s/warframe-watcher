import { Svg, Path } from "react-native-svg";
import React from "react";
import { useWindowDimensions } from "react-native";

const TabBarBackground = () => {
  const { width } = useWindowDimensions();
  const aspectRatio = 74 / 410;
  const height = width * aspectRatio;

  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 410 74"
      preserveAspectRatio="xMidYMid slice"
    >
      <Path fill="#060A12" d="M20 10h370v53H20z" />
      <Path fill="#3D4879" stroke="#3D4879" d="M20.5 59.5h369v3h-369z" />
      <Path stroke="#3D4879" strokeWidth={0.5} d="M17.1 7.1h375.8v58.8H17.1z" />
    </Svg>
  );
};

export default TabBarBackground;
