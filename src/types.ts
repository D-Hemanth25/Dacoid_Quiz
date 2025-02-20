export interface Question {
  id: number;
  text: string;
  type: 'multiple-choice' | 'numeric';
  options?: string[];
  correctAnswer: number;
  numericAnswer?: number;
}

export interface QuizAttempt {
  date: Date;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  userName: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: number[];
  timeRemaining: number;
  isComplete: boolean;
  score: number;
  isStarted: boolean;
  userName: string;
}