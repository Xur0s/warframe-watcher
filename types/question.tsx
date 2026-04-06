export type question = {
  id: string;
  choices: string[];
  subQuestions?: {
    subId: string;
    questions: Record<string, string[]>;
  };
  type?: string;
};

export type questionResult = {
  [key: string]: string | undefined;
};
