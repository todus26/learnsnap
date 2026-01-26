import React, { useEffect, useState } from 'react';

const BadgeNotification = ({ badge, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (badge) {
      setIsVisible(true);

      // 5초 후 자동으로 닫기
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [badge]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  if (!badge) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      }`}
    >
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-lg shadow-2xl p-6 max-w-sm">
        <div className="flex items-start gap-4">
          {/* 뱃지 아이콘 */}
          <div className="flex-shrink-0 bg-white bg-opacity-20 rounded-full p-3">
            <span className="text-4xl">{badge.icon || '🏆'}</span>
          </div>

          {/* 내용 */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-lg">🎉 새 뱃지 획득!</h3>
              <button
                onClick={handleClose}
                className="text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <p className="font-semibold text-xl mb-1">{badge.name}</p>
            {badge.description && (
              <p className="text-sm text-white text-opacity-90">
                {badge.description}
              </p>
            )}
          </div>
        </div>

        {/* 진행률 바 (자동 닫힘 표시) */}
        <div className="mt-4 w-full bg-white bg-opacity-20 rounded-full h-1">
          <div
            className="bg-white h-1 rounded-full transition-all duration-5000 ease-linear"
            style={{ width: isVisible ? '0%' : '100%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BadgeNotification;
