import BlurSurveyScreen from "@/components/BlurSurveyScreen";
import { fissureQuestions } from "@/data/fissureQuestions";
import { useConfigsStorage } from "@/hooks/useConfigsStorage";
import { useSurvey } from "@/hooks/useSurvey";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const Survey = () => {
  const { result, currentQuestion, handleChoice, goBack } =
    useSurvey(fissureQuestions);
  const {
    refreshConfig,
    saveConfig,
    updateConfig,
    deleteConfig,
    toggleConfig,
  } = useConfigsStorage();
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isCompleted) {
      saveConfig(result);
      refreshConfig();
      router.navigate("/(tabs)/(add)");
      console.log(result);
    }
  }, [isCompleted, result, saveConfig, refreshConfig]);

  if (!currentQuestion) {
    if (!isCompleted) setIsCompleted(true);

    return <Text>Completing Survey...</Text>;
  }

  return (
    <View className="flex flex-1 relative">
      <BlurSurveyScreen
        Title={currentQuestion.title}
        Subtitle="Choose one"
        Choices={currentQuestion.choices}
        Type={currentQuestion.type}
        AnswerCallBack={handleChoice}
        goBack={goBack}
      />
    </View>
  );
};

export default Survey;
