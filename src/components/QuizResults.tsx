import React from 'react';
import { Trophy, Home } from 'lucide-react';
import { QuizAttempt } from '../types';

interface QuizResultsProps {
  currentAttempt: QuizAttempt;
  attempts: QuizAttempt[];
  onRetry: () => void;
  onHome: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  currentAttempt,
  attempts,
  onRetry,
  onHome,
}) => {
  const userAttempts = attempts.filter(a => a.userName === currentAttempt.userName);
  const attemptNumber = userAttempts.length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
        <h2 className="mt-4 text-2xl font-bold text-white">Quiz Complete!</h2>
        <div className="mt-4 space-y-2">
          <p className="text-xl text-gray-300">
            Great effort, {currentAttempt.userName}!
          </p>
          <p className="text-lg text-gray-300">
            This was your attempt #{attemptNumber}
          </p>
          <p className="text-2xl font-semibold text-white">
            Score: {currentAttempt.score} out of {currentAttempt.totalQuestions}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-white mb-4">Your Previous Attempts</h3>
        <div className="space-y-2">
          {userAttempts.map((attempt, index) => (
            <div
              key={index}
              className="p-4 bg-gray-800 rounded-lg border border-gray-700"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-300">
                  {new Date(attempt.date).toLocaleDateString()}
                </span>
                <span className="font-semibold text-white">
                  Score: {attempt.score}/{attempt.totalQuestions}
                </span>
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Time spent: {Math.round(attempt.timeSpent / 1000)}s
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onRetry}
          className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={onHome}
          className="flex-1 px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Home
        </button>
      </div>
    </div>
  );
};