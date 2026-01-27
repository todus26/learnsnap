import React, { useEffect, useState } from 'react';

const Toast = ({ id, message, type, duration, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  // 타입별 스타일
  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-800 text-white';
    }
  };

  // 타입별 아이콘
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '';
    }
  };

  // 닫기 애니메이션
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  // 자동 닫기
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  return (
    <div
      className={`
        ${getToastStyles()}
        px-6 py-4 rounded-lg shadow-lg mb-3 min-w-[300px] max-w-md
        flex items-center justify-between gap-3
        transition-all duration-300 transform
        ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
      `}
    >
      <div className="flex items-center gap-3 flex-1">
        {/* 아이콘 */}
        <span className="text-2xl">{getIcon()}</span>

        {/* 메시지 */}
        <p className="text-sm font-medium flex-1">{message}</p>
      </div>

      {/* 닫기 버튼 */}
      <button
        onClick={handleClose}
        className="text-white hover:text-gray-200 transition-colors"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
