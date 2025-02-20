import React, { useState } from 'react';
import { Brain, Clock, History } from 'lucide-react';

interface HomePageProps {
  onStartQuiz: (userName: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStartQuiz }) => {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');

  const handleStart = () => {
    if (!userName.trim()) {
      setError('Please enter your name to start the quiz');
      return;
    }
    onStartQuiz(userName.trim());
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          Welcome to the Dacoid Digital Quiz
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Test your knowledge with our interactive quiz platform
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg">
            <Brain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Multiple Question Types
            </h3>
            <p className="text-gray-400">
              Challenge yourself with multiple-choice and numeric questions
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <Clock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Timed Questions
            </h3>
            <p className="text-gray-400">
              Race against time with our 30-second per question limit
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <History className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Track Progress
            </h3>
            <p className="text-gray-400">
              View your attempt history and improve your scores
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <div className="space-y-4">
            <input
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setError('');
              }}
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleStart();
                }
              }}
            />
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
          </div>
        </div>

        <button
          onClick={handleStart}
          className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};