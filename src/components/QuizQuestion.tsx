import React, { useState } from 'react';
import { Question } from '../types';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: number | null;
  onSelectAnswer: (answer: number) => void;
  showFeedback: boolean;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  showFeedback,
}) => {
  const [numericInput, setNumericInput] = useState('');

  if (question.type === 'numeric') {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">{question.text}</h2>
        <div className="space-y-2">
          <input
            type="number"
            value={numericInput}
            onChange={(e) => setNumericInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && numericInput) {
                onSelectAnswer(parseInt(numericInput, 10));
              }
            }}
            className={`w-full p-4 text-left rounded-lg transition-colors bg-gray-700 text-white border ${
              showFeedback
                ? parseInt(numericInput, 10) === question.numericAnswer
                  ? 'border-green-500 bg-green-900'
                  : 'border-red-500 bg-red-900'
                : 'border-gray-600'
            }`}
            placeholder="Enter your answer..."
            disabled={showFeedback}
          />
          <button
            onClick={() => numericInput && onSelectAnswer(parseInt(numericInput, 10))}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={!numericInput || showFeedback}
          >
            Submit Answer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">{question.text}</h2>
      <div className="space-y-2">
        {question.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(index)}
            className={`w-full p-4 text-left rounded-lg transition-colors ${
              selectedAnswer === index
                ? showFeedback
                  ? index === question.correctAnswer
                    ? 'bg-green-900 border-green-500'
                    : 'bg-red-900 border-red-500'
                  : 'bg-blue-900 border-blue-500'
                : 'bg-gray-700 hover:bg-gray-600'
            } border ${
              selectedAnswer === index ? 'border-2' : 'border-gray-600'
            } text-white`}
            disabled={showFeedback}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};