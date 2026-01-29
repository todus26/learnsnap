import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  ...props 
}) => {
  // 기본 스타일
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  // Variant별 전체 클래스명 (조합하지 않고 직접 지정)
  let variantClass = '';
  if (variant === 'primary') {
    variantClass = 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus:ring-primary-500';
  } else if (variant === 'secondary') {
    variantClass = 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 active:bg-secondary-300 focus:ring-secondary-500';
  } else if (variant === 'outline') {
    variantClass = 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500';
  } else if (variant === 'ghost') {
    variantClass = 'text-primary-600 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500';
  } else if (variant === 'danger') {
    variantClass = 'bg-error-600 text-white hover:bg-error-700 active:bg-error-800 focus:ring-error-500';
  }

  // Size별 클래스명
  let sizeClass = '';
  if (size === 'sm') {
    sizeClass = 'px-3 py-1.5 text-sm';
  } else if (size === 'md') {
    sizeClass = 'px-4 py-2 text-base';
  } else if (size === 'lg') {
    sizeClass = 'px-6 py-3 text-lg';
  }

  // 비활성화 스타일
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  // 전체 너비
  const widthClass = fullWidth ? 'w-full' : '';

  // 모든 클래스 합치기 (공백으로 구분)
  const finalClassName = [
    baseStyles,
    variantClass,
    sizeClass,
    widthClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={finalClassName}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
