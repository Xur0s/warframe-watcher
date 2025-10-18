import { View, Image, useWindowDimensions, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import ScreenGradient from "@/components/ScreenGradient";
import ScrollFissureCard from "@/components/ScrollFissureCard";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const normal = () => {
  const [fissures, setFissures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/fissures`);
      const data = await res.json();
      if (data) {
        setFissures(data);
      }
    } catch (err) {
      console.error("Failed to get timers from API");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    const refreshInterval = setInterval(fetchData, 10000);
    return () => clearInterval(refreshInterval);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

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
          {loading ? <></> : <ScrollFissureCard cardData={fissures} />}
        </View>
      </View>
    </>
  );
};

export default normal;
