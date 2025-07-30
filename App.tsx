import React, { useState, useCallback, useEffect } from 'react';
import { GameState, MbtiScores, LearningTypeResult } from './types';
import { fetchLearningStyle, fetchFollowUpAnswer } from './services/geminiService';
import { QUESTIONS } from './constants';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultScreen from './components/ResultScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [scores, setScores] = useState<MbtiScores>({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  const [finalMbtiType, setFinalMbtiType] = useState<string>('');
  const [result, setResult] = useState<LearningTypeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isFollowUpLoading, setIsFollowUpLoading] = useState<boolean>(false);
  const [followUpAnswer, setFollowUpAnswer] = useState<string | null>(null);
  const [followUpError, setFollowUpError] = useState<string | null>(null);

  const handleStart = () => {
    setGameState(GameState.Quiz);
  };

  const handleAnswer = (type: keyof MbtiScores) => {
    setScores(prev => ({ ...prev, [type]: prev[type] + 1 }));

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameState(GameState.Loading);
    }
  };

  const calculateResult = useCallback(() => {
    const EorI = scores.E > scores.I ? 'E' : 'I';
    const SorN = scores.S > scores.N ? 'S' : 'N';
    const TorF = scores.T > scores.F ? 'T' : 'F';
    const JorP = scores.J > scores.P ? 'J' : 'P';
    return `${EorI}${SorN}${TorF}${JorP}`;
  }, [scores]);

  useEffect(() => {
    if (gameState === GameState.Loading) {
      const mbtiType = calculateResult();
      setFinalMbtiType(mbtiType);

      const getResult = async () => {
        try {
          setError(null);
          const data = await fetchLearningStyle(mbtiType);
          setResult(data);
          setGameState(GameState.Result);
        } catch (e) {
          console.error(e);
          setError('결과를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.');
          setGameState(GameState.Result); // Go to result screen to show error
        }
      };
      getResult();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, calculateResult]);

  const handleFollowUpSubmit = async (question: string) => {
    if (!result || !finalMbtiType) return;

    setIsFollowUpLoading(true);
    setFollowUpAnswer(null);
    setFollowUpError(null);

    try {
      const answer = await fetchFollowUpAnswer(finalMbtiType, result, question);
      setFollowUpAnswer(answer);
    } catch (e) {
      console.error(e);
      setFollowUpError('AI에게 질문하는 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsFollowUpLoading(false);
    }
  };

  const handleRestart = () => {
    setGameState(GameState.Start);
    setCurrentQuestionIndex(0);
    setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
    setFinalMbtiType('');
    setResult(null);
    setError(null);
    setIsFollowUpLoading(false);
    setFollowUpAnswer(null);
    setFollowUpError(null);
  };

  const renderScreen = () => {
    switch (gameState) {
      case GameState.Quiz:
        return (
          <QuizScreen
            question={QUESTIONS[currentQuestionIndex]}
            onAnswer={handleAnswer}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={QUESTIONS.length}
          />
        );
      case GameState.Loading:
        return <LoadingScreen />;
      case GameState.Result:
        return (
          <ResultScreen
            mbtiType={finalMbtiType}
            result={result}
            error={error}
            onRestart={handleRestart}
            onFollowUpSubmit={handleFollowUpSubmit}
            isFollowUpLoading={isFollowUpLoading}
            followUpAnswer={followUpAnswer}
            followUpError={followUpError}
          />
        );
      case GameState.Start:
      default:
        return <StartScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="bg-[#212121] text-white min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4">
        <main className="w-full max-w-lg">{renderScreen()}</main>
      </div>
      <footer className="w-full text-center text-neutral-500 text-xs py-4">
        © 2025 왕해솔
      </footer>
    </div>
  );
};

export default App;