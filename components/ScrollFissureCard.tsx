import { View, Text, ScrollView } from "react-native";
import React from "react";
import FissureCard from "./FissureCard";

const cardData = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
];

const ScrollFissureCard = () => {
  return (
    <ScrollView
      className=""
      contentContainerClassName="gap-3"
      showsHorizontalScrollIndicator={false}
    >
      {cardData.map((card) => (
        <FissureCard key={card.id} />
      ))}
    </ScrollView>
  );
};

export default ScrollFissureCard;
