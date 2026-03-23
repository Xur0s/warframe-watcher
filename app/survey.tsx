import BlurSurveyScreen from "@/components/BlurSurveyScreen";
import { fissureQuestions } from "@/data/fissureQuestions";
import { useSurvey } from "@/hooks/useSurvey";
import React from "react";
import { Text, View } from "react-native";

const survey = () => {
  const { currentQuestion, handleChoice, goBack } = useSurvey(fissureQuestions);

  if (!currentQuestion) {
    return (
      <View>
        <Text>Survey Done</Text>
      </View>
    );
  }

  return (
    <View className="flex flex-1 relative">
      <BlurSurveyScreen
        Title={currentQuestion.id}
        Subtitle="Choose one"
        Choices={currentQuestion.choices}
        AnswerCallBack={handleChoice}
        goBack={goBack}
      />
    </View>
  );
};

export default survey;
