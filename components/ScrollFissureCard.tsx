import { View, Text, ScrollView } from "react-native";
import React from "react";
import FissureCard from "./FissureCard";

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

const ScrollFissureCard = ({ cardData }: { cardData: Fissure[] }) => {
  return (
    <ScrollView
      className=""
      contentContainerClassName="gap-3"
      showsHorizontalScrollIndicator={false}
    >
      {cardData.map((data) => (
        <FissureCard key={data.id} />
      ))}
    </ScrollView>
  );
};

export default ScrollFissureCard;
