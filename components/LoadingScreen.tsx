
import React from 'react';
import PixelatedContainer from './PixelatedContainer';

const LoadingScreen: React.FC = () => {
  return (
    <PixelatedContainer className="text-center">
      <h2 className="text-2xl sm:text-4xl text-white mb-4 animate-pulse">
        결과 분석 중...
      </h2>
      <p className="text-neutral-300">
        당신의 학습 유형을 소환하고 있습니다!
      </p>
       <div className="mt-8 text-5xl">
         <span className="animate-bounce inline-block">💾</span>
      </div>
    </PixelatedContainer>
  );
};

export default LoadingScreen;
