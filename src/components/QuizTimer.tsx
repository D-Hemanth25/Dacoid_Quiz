import React, { useEffect } from 'react';
import { Timer } from 'lucide-react';

interface QuizTimerProps {
  timeRemaining: number;
  onTimeUp: () => void;
}

export const QuizTimer: React.FC<QuizTimerProps> = ({ timeRemaining, onTimeUp }) => {
  useEffect(() => {
    if (timeRemaining === 0) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  return (
    <div className="flex items-center gap-2 text-lg font-semibold text-white">
      <Timer className="w-6 h-6" />
      <span>{timeRemaining} seconds</span>
    </div>
  );
};