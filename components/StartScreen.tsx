import React from 'react';
import PixelatedContainer from './PixelatedContainer';
import PixelatedButton from './PixelatedButton';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <PixelatedContainer className="text-center">
      <h1 className="text-3xl sm:text-5xl text-yellow-400 mb-8 tracking-wider">
        8-BIT
        <span className="block text-xl sm:text-3xl text-white mt-2 tracking-normal">LEARNING STYLE QUEST</span>
      </h1>
      <p className="text-neutral-300 mb-12 text-sm sm:text-base">
        간단한 퀘스트를 통해 당신의 숨겨진 학습 잠재력을 알아보세요!
      </p>
      <div className="max-w-md mx-auto">
        <PixelatedButton onClick={onStart}>
          PRESS START
        </PixelatedButton>
      </div>
    </PixelatedContainer>
  );
};

export default StartScreen;