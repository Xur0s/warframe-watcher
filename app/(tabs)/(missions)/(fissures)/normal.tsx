import { View, Image, useWindowDimensions } from "react-native";
import React from "react";
import { images } from "@/constants/images";
import ScreenGradient from "@/components/ScreenGradient";
import ScrollFissureCard from "@/components/ScrollFissureCard";

const normal = () => {
  return (
    <>
      <View className="flex-1">
        <Image
          source={images.background_image}
          className="absolute"
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />

        <View className="absolute top-0">
          <ScreenGradient direction="top" />
        </View>
        <View className="absolute bottom-0">
          <ScreenGradient direction="bottom" />
        </View>

        <View className="pt-[160] pb-[130]">
          <ScrollFissureCard />
        </View>
      </View>
    </>
  );
};

export default normal;
