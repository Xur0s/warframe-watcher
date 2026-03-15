import React from "react";
import { ScrollView } from "react-native";
import FissureCard from "./FissureCard2";

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
  const lithFissures = cardData.filter(
    (fissure) => fissure?.tier.toLowerCase() === "lith"
  );
  const mesoFissures = cardData.filter(
    (fissure) => fissure?.tier.toLowerCase() === "meso"
  );
  const neoFissures = cardData.filter(
    (fissure) => fissure?.tier.toLowerCase() === "neo"
  );
  const axiFissures = cardData.filter(
    (fissure) => fissure?.tier.toLowerCase() === "axi"
  );
  const omniaFissures = cardData.filter(
    (fissure) => fissure?.tier.toLowerCase() === "omnia"
  );
  const requiemFissures = cardData.filter(
    (fissure) => fissure?.tier.toLowerCase() === "requiem"
  );
  return (
    <ScrollView
      className=""
      contentContainerClassName="gap-3"
      showsHorizontalScrollIndicator={false}
    >
      {omniaFissures.map((data) => (
        <FissureCard key={data.id} data={data} />
      ))}
      {lithFissures.map((data) => (
        <FissureCard key={data.id} data={data} />
      ))}
      {mesoFissures.map((data) => (
        <FissureCard key={data.id} data={data} />
      ))}
      {neoFissures.map((data) => (
        <FissureCard key={data.id} data={data} />
      ))}
      {axiFissures.map((data) => (
        <FissureCard key={data.id} data={data} />
      ))}
      {requiemFissures.map((data) => (
        <FissureCard key={data.id} data={data} />
      ))}
    </ScrollView>
  );
};

export default ScrollFissureCard;
