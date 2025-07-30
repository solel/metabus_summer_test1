
import React from 'react';

interface PixelatedContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PixelatedContainer: React.FC<PixelatedContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-[#2E2E2E] p-6 sm:p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${className}`}>
      {children}
    </div>
  );
};

export default PixelatedContainer;
