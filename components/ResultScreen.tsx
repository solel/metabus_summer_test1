import React, { useState } from 'react';
import { LearningTypeResult } from '../types';
import PixelatedContainer from './PixelatedContainer';
import PixelatedButton from './PixelatedButton';

interface ResultScreenProps {
  mbtiType: string;
  result: LearningTypeResult | null;
  error: string | null;
  onRestart: () => void;
  onFollowUpSubmit: (question: string) => void;
  isFollowUpLoading: boolean;
  followUpAnswer: string | null;
  followUpError: string | null;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ 
  mbtiType, 
  result, 
  error, 
  onRestart,
  onFollowUpSubmit,
  isFollowUpLoading,
  followUpAnswer,
  followUpError
}) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !isFollowUpLoading) {
      onFollowUpSubmit(question);
    }
  };

  return (
    <PixelatedContainer>
      {error && (
         <div className="text-center">
            <h2 className="text-2xl text-red-500 mb-4">오류 발생!</h2>
            <p className="text-white mb-8">{error}</p>
            <PixelatedButton onClick={onRestart} className="max-w-xs mx-auto">다시 시도하기</PixelatedButton>
         </div>
      )}
      {result && !error && (
        <div className="text-white">
          <p className="text-lg text-yellow-400 text-left">결과가 나왔습니다!</p>
          <h1 className="text-2xl sm:text-4xl mt-2 mb-8 text-green-400 text-left">
            {result.title}
            <span className="block text-xl sm:text-2xl text-neutral-300 mt-2">({mbtiType})</span>
          </h1>

          <div className="mb-8">
            <img 
              src={`https://picsum.photos/seed/${mbtiType}/400/400`} 
              alt="Result Avatar" 
              className="border-4 border-black w-full max-w-xs mx-auto"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          <div className="space-y-6 text-left">
            <p className="text-base leading-relaxed text-neutral-200">{result.description}</p>
            
            <div>
              <h3 className="text-xl text-yellow-400 mb-2">⭐ 강점</h3>
              <ul className="list-disc list-inside space-y-1 text-neutral-300">
                {result.strengths.map(s => <li key={s} className="leading-normal">{s}</li>)}
              </ul>
            </div>

            <div>
              <h3 className="text-xl text-yellow-400 mb-2">📜 추천 전략</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-300">
                {result.strategies.map(s => <li key={s} className="leading-normal">{s}</li>)}
              </ul>
            </div>
          </div>
          
          {/* Follow-up Section */}
          <div className="mt-12 pt-8 border-t-4 border-black">
            <h3 className="text-xl text-yellow-400 mb-4 text-left">
              💬 AI에게 더 물어보기
            </h3>
            <p className="text-neutral-300 mb-6 text-left text-sm leading-relaxed">
              자신의 학습 스타일에 대해 더 궁금한 점이 있다면 아래에 질문해보세요!
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="예: 저에게 맞는 암기법을 알려주세요."
                className="w-full bg-[#212121] border-4 border-black p-4 text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-400 h-24 resize-none"
                style={{fontFamily: "'Press Start 2P', cursive"}}
                disabled={isFollowUpLoading}
              />
              <PixelatedButton
                type="submit"
                disabled={isFollowUpLoading}
                className="bg-yellow-400 hover:bg-yellow-300 w-full"
              >
                {isFollowUpLoading ? '분석 중...' : '질문하기'}
              </PixelatedButton>
            </form>

            {isFollowUpLoading && (
              <div className="mt-6 text-center text-green-400 animate-pulse">
                AI가 답변을 생성하고 있습니다...
              </div>
            )}

            {followUpError && (
              <div className="mt-6 p-4 bg-red-900/50 border-2 border-red-500 text-white text-left leading-relaxed">
                <p className="font-bold">오류!</p>
                <p>{followUpError}</p>
              </div>
            )}
            
            {followUpAnswer && (
              <div className="mt-6 p-4 bg-black/50 border-2 border-neutral-600 text-left space-y-2">
                 <h4 className="font-bold text-green-400">🤖 AI의 답변:</h4>
                 <p className="leading-relaxed whitespace-pre-wrap">{followUpAnswer}</p>
              </div>
            )}
          </div>


          <div className="text-center mt-12">
            <PixelatedButton onClick={onRestart} className="max-w-xs mx-auto bg-green-500 hover:bg-green-400">
                다시하기
            </PixelatedButton>
          </div>
        </div>
      )}
    </PixelatedContainer>
  );
};

export default ResultScreen;