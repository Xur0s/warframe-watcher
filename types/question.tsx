export type question = {
  id: string;
  title: string;
  choices: string[];
  subQuestions?: {
    subId: string;
    subTitle: string;
    questions: Record<string, string[]>;
  };
  type?: string;
};

export type questionResult = {
  [key: string]: string | boolean | undefined;
};
