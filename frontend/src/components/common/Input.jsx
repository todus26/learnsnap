import React from 'react';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  // 기본 스타일
  const baseStyles = 'w-full px-4 py-2.5 text-base border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';
  
  // 에러 여부에 따른 스타일
  let stateClass = '';
  if (error) {
    stateClass = 'border-error-500 focus:border-error-500 focus:ring-error-500';
  } else {
    stateClass = 'border-secondary-300 focus:border-primary-500 focus:ring-primary-500';
  }
  
  // 비활성화 스타일
  const disabledClass = disabled ? 'bg-secondary-50 cursor-not-allowed opacity-60' : 'bg-white';

  // 최종 클래스명
  const finalClassName = [
    baseStyles,
    stateClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-secondary-700 mb-2">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={finalClassName}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-error-600">{error}</p>
      )}
    </div>
  );
};

export default Input;
