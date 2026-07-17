import ScreenGradient from "@/components/ScreenGradient";
import ScrollFissureCard from "@/components/ScrollFissureCard";
import { images } from "@/constants/images";
import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface Fissure {
  id: string;
  activation: string;
  expiry: string;
  planet: string;
  node: string;
  enemy_faction: string;
  mission_type: string;
  tier: string;
  expired: boolean;
  isStorm: boolean;
  isHard: boolean;
}

const steelPath = () => {
  const [fissures, setFissures] = useState<Fissure[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/fissures/hard`);
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

export default steelPath;
