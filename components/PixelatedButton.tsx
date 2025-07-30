import React from 'react';

interface PixelatedButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const PixelatedButton: React.FC<PixelatedButtonProps> = ({ onClick, children, className = '', disabled = false, type = 'button' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`
        w-full bg-yellow-400 text-black p-4 text-center text-lg sm:text-xl
        border-4 border-black 
        shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
        transition-all duration-100
        ${!disabled ? `
          hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5
          active:shadow-none active:translate-x-[6px] active:translate-y-[6px]` : ''
        }
        ${disabled ? 'cursor-not-allowed opacity-60' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default PixelatedButton;
