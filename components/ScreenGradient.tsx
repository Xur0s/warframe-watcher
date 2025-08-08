import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import { vectors } from "@/constants/vectors";

const ScreenGradient = ({ direction }: { direction: "top" | "bottom" }) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const svgWidth = 412;
  const svgHeight = 235;
  const aspectRatio = svgWidth / svgHeight;

  const width = screenWidth;
  const height = width / aspectRatio;

  if (direction == "top") {
    const Gradient = vectors.top_gradient;
    return <Gradient width={width} height={height} />;
  }

  if (direction == "bottom") {
    const Gradient = vectors.bottom_gradient;
    return <Gradient width={width} height={height} />;
  }

  return null;
};

export default ScreenGradient;
