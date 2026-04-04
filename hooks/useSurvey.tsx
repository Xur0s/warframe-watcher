import { question, questionResult } from "@/types/question";
import { router } from "expo-router";
import { useState } from "react";

export function useSurvey(questions: question[]) {
  const [queue, setQueue] = useState<question[]>(questions);
  const [history, setHistory] = useState<question[]>([]);
  const [result, setResult] = useState<questionResult>({});

  const currentQuestion = queue[0];

  function nextQuestion(choice: string) {
    let nextQ = queue.slice(1); // Delete 1st item from array

    if (currentQuestion.subQuestions?.questions[choice]) {
      const subId = currentQuestion.subQuestions.subId;
      const choices = currentQuestion.subQuestions.questions[choice];

      nextQ.unshift({ id: subId, choices: choices }); // Add item to array at idx 0
    }

    setQueue(nextQ);
  }

  function handleChoice(choice: string) {
    setResult((prev) => ({
      ...prev,
      [currentQuestion.id]: choice,
    }));

    setHistory((prev) => [...prev, currentQuestion]);

    nextQuestion(choice);
  }

  function goBack() {
    if (history.length < 1) {
      return router.push("/(tabs)/(add)");
    }

    const prevQuestion = history[history.length - 1];

    setHistory((h) => h.slice(0, -1)); // history = [first idx, ... , last idx - 1]

    setQueue((q) => [prevQuestion, ...q]);
  }

  return {
    currentQuestion,
    result,
    handleChoice,
    goBack,
  };
}
