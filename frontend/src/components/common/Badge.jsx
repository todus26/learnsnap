import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '',
  ...props 
}) => {
  // 기본 스타일
  const baseStyles = 'inline-flex items-center font-semibold rounded-full';

  // Variant
  let variantClass = '';
  if (variant === 'default') {
    variantClass = 'bg-secondary-100 text-secondary-700';
  } else if (variant === 'primary') {
    variantClass = 'bg-primary-100 text-primary-700';
  } else if (variant === 'success') {
    variantClass = 'bg-success-100 text-success-700';
  } else if (variant === 'warning') {
    variantClass = 'bg-warning-100 text-warning-700';
  } else if (variant === 'error') {
    variantClass = 'bg-error-100 text-error-700';
  }

  // Size
  let sizeClass = '';
  if (size === 'sm') {
    sizeClass = 'px-2 py-0.5 text-xs';
  } else if (size === 'md') {
    sizeClass = 'px-2.5 py-1 text-sm';
  } else if (size === 'lg') {
    sizeClass = 'px-3 py-1.5 text-base';
  }

  // 최종 클래스명
  const finalClassName = [
    baseStyles,
    variantClass,
    sizeClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={finalClassName} {...props}>
      {children}
    </span>
  );
};

export default Badge;
