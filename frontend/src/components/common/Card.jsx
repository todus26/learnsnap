import React from 'react';

const Card = ({ 
  children, 
  padding = 'md',
  shadow = 'soft',
  hover = false,
  className = '',
  ...props 
}) => {
  // 기본 스타일
  const baseStyles = 'bg-white rounded-xl border border-secondary-100';

  // Padding
  let paddingClass = '';
  if (padding === 'none') paddingClass = '';
  else if (padding === 'sm') paddingClass = 'p-3';
  else if (padding === 'md') paddingClass = 'p-4';
  else if (padding === 'lg') paddingClass = 'p-6';
  else if (padding === 'xl') paddingClass = 'p-8';

  // Shadow
  let shadowClass = '';
  if (shadow === 'none') shadowClass = '';
  else if (shadow === 'soft') shadowClass = 'shadow-soft';
  else if (shadow === 'medium') shadowClass = 'shadow-medium';
  else if (shadow === 'large') shadowClass = 'shadow-large';

  // Hover
  const hoverClass = hover ? 'hover:shadow-medium transition-shadow duration-200' : '';

  // 최종 클래스명
  const finalClassName = [
    baseStyles,
    paddingClass,
    shadowClass,
    hoverClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={finalClassName} {...props}>
      {children}
    </div>
  );
};

export default Card;
