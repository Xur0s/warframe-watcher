import React from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import WatcherCard from "./WatcherCard";

const WatcherCardScroll = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const width = screenWidth;
  const height = screenHeight * 0.6;

  return (
    <ScrollView
      className="bg-red-500"
      style={{
        bottom: screenHeight * 0.03,
        width: width,
        height: height,
      }}
    >
      <WatcherCard />
    </ScrollView>
  );
};

export default WatcherCardScroll;
