import { View, Image } from "react-native";
import React from "react";
import { images } from "@/constants/images";
import ScreenGradient from "@/components/ScreenGradient";

const add = () => {
  return (
    <View className="flex flex-1 relative">
      <Image
        source={images.background_image}
        className="absolute justify-center items-center"
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      />
      <View className="absolute top-0">
        <ScreenGradient direction="top" />
      </View>
      <View className="absolute bottom-0">
        <ScreenGradient direction="bottom" />
      </View>
    </View>
  );
};

export default add;
