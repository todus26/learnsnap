import React from 'react';

const BadgeDetailModal = ({ badge, userBadge, isOpen, onClose }) => {
  if (!isOpen || !badge) return null;

  const isEarned = !!userBadge;

  // 뱃지 색상
  const getBadgeColor = () => {
    if (isEarned) {
      return 'from-yellow-400 to-orange-500';
    }
    return 'from-gray-300 to-gray-400';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* 뱃지 아이콘 */}
        <div className={`bg-gradient-to-br ${getBadgeColor()} rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-4 shadow-lg`}>
          <span className="text-7xl">{badge.icon || '🏆'}</span>
        </div>

        {/* 뱃지 이름 */}
        <h2 className="text-2xl font-bold text-center mb-2">{badge.name}</h2>

        {/* 획득 상태 */}
        {isEarned ? (
          <div className="text-center mb-4">
            <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-semibold">
              ✓ 획득 완료
            </span>
            {userBadge.earnedAt && (
              <p className="text-sm text-gray-600 mt-2">
                {new Date(userBadge.earnedAt).toLocaleDateString('ko-KR')} 획득
              </p>
            )}
          </div>
        ) : (
          <div className="text-center mb-4">
            <span className="bg-gray-100 text-gray-600 px-4 py-1 rounded-full text-sm font-semibold">
              미획득
            </span>
          </div>
        )}

        {/* 설명 */}
        <div className="border-t pt-4 mb-4">
          <h3 className="font-semibold text-gray-900 mb-2">설명</h3>
          <p className="text-gray-700">{badge.description || '이 뱃지에 대한 설명이 없습니다.'}</p>
        </div>

        {/* 획득 조건 */}
        {badge.condition && (
          <div className="border-t pt-4 mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">획득 조건</h3>
            <p className="text-gray-700">{badge.condition}</p>
          </div>
        )}

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 font-semibold"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default BadgeDetailModal;
