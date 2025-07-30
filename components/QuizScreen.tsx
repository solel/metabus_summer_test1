import React from 'react';
import { Question as QuestionType, Answer } from '../types';
import PixelatedContainer from './PixelatedContainer';
import PixelatedButton from './PixelatedButton';

interface QuizScreenProps {
  question: QuestionType;
  onAnswer: (type: Answer['type']) => void;
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressBar: React.FC<{ value: number; max: number }> = ({ value, max }) => {
  const percent = (value / max) * 100;
  return (
    <div className="w-full bg-black border-4 border-black h-8 mb-8">
      <div
        className="bg-green-500 h-full transition-all duration-300"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

const QuizScreen: React.FC<QuizScreenProps> = ({ question, onAnswer, currentQuestion, totalQuestions }) => {
  return (
    <PixelatedContainer>
      <ProgressBar value={currentQuestion} max={totalQuestions} />
      <p className="mb-4 text-yellow-400">QUEST #{currentQuestion}</p>
      <h2 className="text-xl sm:text-2xl text-white mb-8 leading-normal text-left h-auto min-h-[5rem] sm:min-h-[5rem]">
        {question.text}
      </h2>
      <div className="space-y-6">
        {question.answers.map((answer) => (
          <PixelatedButton 
            key={answer.text} 
            onClick={() => onAnswer(answer.type)}
            className="bg-blue-500 hover:bg-blue-400 text-white"
          >
            {answer.text}
          </PixelatedButton>
        ))}
      </div>
    </PixelatedContainer>
  );
};

export default QuizScreen;