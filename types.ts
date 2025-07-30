
export enum GameState {
  Start,
  Quiz,
  Loading,
  Result,
}

export type MbtiType = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface Answer {
  text: string;
  type: MbtiType;
}

export interface Question {
  text: string;
  answers: [Answer, Answer];
}

export type MbtiScores = Record<MbtiType, number>;

export interface LearningTypeResult {
  title: string;
  description: string;
  strengths: string[];
  strategies: string[];
}
