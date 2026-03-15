import { question, questionResult } from "@/types/question";
import { useState } from "react";

export function useSurvey(questions: question[]) {
  const [queue, setQueue] = useState<question[]>(questions);
  const [history, setHistory] = useState<question[]>([]);
  const [result, setResult] = useState<questionResult>({});

  const currentQuestion = queue[0];

  function nextQuestion(choice: string) {
    let nextQ = queue.slice(1);

    if (currentQuestion.subQuestions?.questions[choice]) {
      const subId = currentQuestion.subQuestions.subId;
      const choices = currentQuestion.subQuestions.questions[choice];

      nextQ.unshift({ id: subId, choices: choices });
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
      return null;
    }

    const prevQuestion = history[history.length - 1];

    setHistory((h) => h.slice(0, -1));

    setQueue((q) => [prevQuestion, ...q]);
  }

  return {
    currentQuestion,
    result,
    handleChoice,
    goBack,
  };
}
