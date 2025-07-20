import {
  View,
  Text,
  Image,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import React from "react";
import { Assets } from "@react-navigation/elements";
import { images } from "@/constants/images";
import Svg from "react-native-svg";
import BottomGradient from "@/components/BottomGradient";
import TopGradient from "@/components/TopGradient";

const missions = () => {
  const { width, height } = useWindowDimensions();

  return (
    <View className="flex flex-1 relative">
      <Image
        source={images.background_image}
        className="absolute justify-center items-center"
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      />
      <TopGradient />
      <BottomGradient />
    </View>
  );
};

export default missions;
