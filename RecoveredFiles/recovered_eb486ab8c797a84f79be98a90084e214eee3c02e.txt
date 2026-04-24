import AddButton from "@/components/AddButton2";
import ScreenGradient from "@/components/ScreenGradient";
import WatcherCardScroll from "@/components/WatcherCardScroll";
import { images } from "@/constants/images";
import React from "react";
import { Image, Text, View } from "react-native";

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

      <View className="flex-1 items-center justify-center">
        <Text className="text-[#A2AECB] absolute top-24 left-4 text-[2.8rem] font-roboto-condensed">
          NOW WATCHING:
        </Text>
        <View className="absolute">
          <WatcherCardScroll />
        </View>
        <View className="absolute bottom-36 rounded">
          <AddButton />
        </View>
      </View>
    </View>
  );
};

export default add;
