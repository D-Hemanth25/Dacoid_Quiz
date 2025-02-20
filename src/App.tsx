import { useState, useEffect } from 'react';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizTimer } from './components/QuizTimer';
import { QuizResults } from './components/QuizResults';
import { HomePage } from './components/HomePage';
import { quizQuestions } from './data/questions';
import { QuizState, QuizAttempt } from './types';

const SECONDS_PER_QUESTION = 30;

function App() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: [],
    timeRemaining: SECONDS_PER_QUESTION,
    isComplete: false,
    score: 0,
    isStarted: false,
    userName: '',
  });

  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [startTime, setStartTime] = useState<Date>(new Date());

  useEffect(() => {
    if (quizState.isStarted && !quizState.isComplete && quizState.timeRemaining > 0) {
      const timer = setInterval(() => {
        setQuizState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizState.isComplete, quizState.timeRemaining, quizState.isStarted]);

  const handleAnswerSelect = (answerIndex: number) => {
    const currentQuestion = quizQuestions[quizState.currentQuestionIndex];
    const isCorrect = currentQuestion.type === 'numeric' 
      ? answerIndex === currentQuestion.numericAnswer
      : answerIndex === currentQuestion.correctAnswer;

    setTimeout(() => {
      if (quizState.currentQuestionIndex < quizQuestions.length - 1) {
        setQuizState(prev => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          answers: [...prev.answers, answerIndex],
          timeRemaining: SECONDS_PER_QUESTION,
          score: isCorrect ? prev.score + 1 : prev.score,
        }));
      } else {
        const endTime = new Date();
        const newAttempt: QuizAttempt = {
          date: new Date(),
          score: isCorrect ? quizState.score + 1 : quizState.score,
          totalQuestions: quizQuestions.length,
          timeSpent: endTime.getTime() - startTime.getTime(),
          userName: quizState.userName,
        };

        setAttempts(prev => [newAttempt, ...prev]);
        setQuizState(prev => ({
          ...prev,
          isComplete: true,
          answers: [...prev.answers, answerIndex],
          score: isCorrect ? prev.score + 1 : prev.score,
        }));
      }
    }, 1000);
  };

  const handleTimeUp = () => {
    if (quizState.currentQuestionIndex < quizQuestions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        answers: [...prev.answers, -1],
        timeRemaining: SECONDS_PER_QUESTION,
      }));
    } else {
      const endTime = new Date();
      const newAttempt: QuizAttempt = {
        date: new Date(),
        score: quizState.score,
        totalQuestions: quizQuestions.length,
        timeSpent: endTime.getTime() - startTime.getTime(),
        userName: quizState.userName,
      };

      setAttempts(prev => [newAttempt, ...prev]);
      setQuizState(prev => ({
        ...prev,
        isComplete: true,
        answers: [...prev.answers, -1],
      }));
    }
  };

  const handleStartQuiz = (userName: string) => {
    setQuizState({
      currentQuestionIndex: 0,
      answers: [],
      timeRemaining: SECONDS_PER_QUESTION,
      isComplete: false,
      score: 0,
      isStarted: true,
      userName,
    });
    setStartTime(new Date());
  };

  const handleRetry = () => {
    setQuizState(prev => ({
      currentQuestionIndex: 0,
      answers: [],
      timeRemaining: SECONDS_PER_QUESTION,
      isComplete: false,
      score: 0,
      isStarted: true,
      userName: prev.userName,
    }));
    setStartTime(new Date());
  };

  const handleHome = () => {
    setQuizState({
      currentQuestionIndex: 0,
      answers: [],
      timeRemaining: SECONDS_PER_QUESTION,
      isComplete: false,
      score: 0,
      isStarted: false,
      userName: '',
    });
  };

  if (!quizState.isStarted) {
    return <HomePage onStartQuiz={handleStartQuiz} />;
  }

  if (quizState.isComplete) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <QuizResults
            currentAttempt={attempts[0]}
            attempts={attempts}
            onRetry={handleRetry}
            onHome={handleHome}
          />
        </div>
      </div>
    );
  }

  const currentQuestion = quizQuestions[quizState.currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div className="text-gray-300">
              <div>Welcome, {quizState.userName}!</div>
              <div className="mt-1">Question {quizState.currentQuestionIndex + 1} of {quizQuestions.length}</div>
            </div>
            <QuizTimer
              timeRemaining={quizState.timeRemaining}
              onTimeUp={handleTimeUp}
            />
          </div>

          <div className="border-t border-gray-700 pt-6">
            <QuizQuestion
              question={currentQuestion}
              selectedAnswer={quizState.answers[quizState.currentQuestionIndex] ?? null}
              onSelectAnswer={handleAnswerSelect}
              showFeedback={quizState.answers[quizState.currentQuestionIndex] !== undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;