import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = '' }) => {
  // Size별 클래스
  let sizeClass = '';
  let textSizeClass = '';
  
  if (size === 'small') {
    sizeClass = 'w-8 h-8';
    textSizeClass = 'text-sm';
  } else if (size === 'medium') {
    sizeClass = 'w-12 h-12';
    textSizeClass = 'text-base';
  } else if (size === 'large') {
    sizeClass = 'w-16 h-16';
    textSizeClass = 'text-lg';
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {/* 스피너 */}
      <div className={`${sizeClass} border-4 border-secondary-200 border-t-primary-600 rounded-full animate-spin`}></div>
      
      {/* 텍스트 */}
      {text && (
        <p className={`${textSizeClass} text-secondary-600 font-medium`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
