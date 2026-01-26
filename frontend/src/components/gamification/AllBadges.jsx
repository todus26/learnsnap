import React, { useState } from 'react';
import BadgeDetailModal from './BadgeDetailModal';

const AllBadges = ({ allBadges = [], userBadges = [] }) => {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [selectedUserBadge, setSelectedUserBadge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 사용자가 획득한 뱃지 ID 목록
  const earnedBadgeIds = userBadges.map(ub => ub.badge?.id || ub.badgeId);

  // 뱃지 클릭 핸들러
  const handleBadgeClick = (badge) => {
    const userBadge = userBadges.find(ub => (ub.badge?.id || ub.badgeId) === badge.id);
    setSelectedBadge(badge);
    setSelectedUserBadge(userBadge || null);
    setIsModalOpen(true);
  };

  // 뱃지 색상
  const getBadgeColor = (badgeId, index) => {
    const isEarned = earnedBadgeIds.includes(badgeId);
    
    if (!isEarned) {
      return 'from-gray-300 to-gray-400';
    }

    const colors = [
      'from-yellow-400 to-orange-500',
      'from-blue-400 to-blue-600',
      'from-green-400 to-green-600',
      'from-purple-400 to-purple-600',
      'from-pink-400 to-pink-600',
      'from-red-400 to-red-600',
      'from-indigo-400 to-indigo-600',
      'from-teal-400 to-teal-600'
    ];
    return colors[index % colors.length];
  };

  if (allBadges.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>등록된 뱃지가 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">전체 뱃지</h3>
          <div className="text-sm text-gray-600">
            {earnedBadgeIds.length} / {allBadges.length} 획득
          </div>
        </div>

        {/* 진행률 바 */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(earnedBadgeIds.length / allBadges.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 text-right">
          {Math.round((earnedBadgeIds.length / allBadges.length) * 100)}% 완료
        </p>
      </div>

      {/* 뱃지 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allBadges.map((badge, index) => {
          const isEarned = earnedBadgeIds.includes(badge.id);

          return (
            <div
              key={badge.id}
              onClick={() => handleBadgeClick(badge)}
              className="relative group cursor-pointer"
            >
              {/* 뱃지 카드 */}
              <div
                className={`bg-gradient-to-br ${getBadgeColor(badge.id, index)} rounded-lg p-6 text-white text-center shadow-md hover:shadow-xl transition-all ${
                  !isEarned ? 'opacity-50' : ''
                }`}
              >
                {/* 뱃지 아이콘 */}
                <div className={`text-5xl mb-3 ${!isEarned ? 'filter grayscale' : ''}`}>
                  {badge.icon || '🏆'}
                </div>

                {/* 뱃지 이름 */}
                <h4 className="font-bold text-lg mb-1">{badge.name}</h4>

                {/* 획득 상태 */}
                {isEarned ? (
                  <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                    획득 완료
                  </span>
                ) : (
                  <span className="text-xs bg-black bg-opacity-20 px-2 py-1 rounded-full">
                    미획득
                  </span>
                )}

                {/* 잠금 아이콘 (미획득) */}
                {!isEarned && (
                  <div className="absolute top-2 right-2 bg-black bg-opacity-30 rounded-full p-1">
                    <span className="text-xl">🔒</span>
                  </div>
                )}
              </div>

              {/* 호버 시 설명 미리보기 */}
              {badge.description && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg max-w-xs">
                    <div className="line-clamp-2">{badge.description}</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 뱃지 상세 모달 */}
      <BadgeDetailModal
        badge={selectedBadge}
        userBadge={selectedUserBadge}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AllBadges;
