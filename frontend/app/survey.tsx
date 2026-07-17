import BlurSurveyScreen from "@/components/BlurSurveyScreen";
import { fissureQuestions } from "@/data/fissureQuestions";
import { useSurvey } from "@/hooks/useSurvey";
import savePreference from "@/services/preference.js";
import { useStoreSelectors } from "@/store/userConfigStore";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const Survey = () => {
  const { result, currentQuestion, handleChoice, goBack } =
    useSurvey(fissureQuestions);
  const saveConfig = useStoreSelectors.use.addConfig();
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    async function completeSurvey() {
      if (!isCompleted) return;

      saveConfig(result);

      try {
        await savePreference(result);
        router.navigate("/(tabs)/(add)");
      } catch (err) {
        console.error(err);
      }
    }

    completeSurvey();
  }, [isCompleted, result, saveConfig]);

  useEffect(() => {
    if (!currentQuestion) {
      setIsCompleted(true);
    }
  }, [currentQuestion]);

  if (!currentQuestion) {
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
