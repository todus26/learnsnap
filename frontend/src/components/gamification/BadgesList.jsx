import React from 'react';

const BadgesList = ({ userBadges = [] }) => {
  // 뱃지 아이콘 매핑
  const getBadgeIcon = (badgeName) => {
    const iconMap = {
      '첫 걸음': '👶',
      '열정': '🔥',
      '완주자': '🏁',
      '숙련자': '⭐',
      '마스터': '👑',
      '퀴즈왕': '🎯',
      '완벽주의': '💯',
      '연속학습': '📚',
      '새벽형': '🌅',
      '야행성': '🌙',
      '주말전사': '⚔️',
      '탐험가': '🗺️',
      '박학다식': '🎓',
      '속도광': '⚡',
      '꾸준함': '🌱'
    };
    return iconMap[badgeName] || '🏆';
  };

  // 뱃지 색상 (랜덤하게 다양한 색상 적용)
  const getBadgeColor = (index) => {
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

  if (userBadges.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <span className="text-6xl mb-4 block">🏆</span>
        <p className="text-gray-600 text-lg mb-2">아직 획득한 뱃지가 없습니다</p>
        <p className="text-gray-500 text-sm">
          학습을 계속하면서 다양한 뱃지를 획득해보세요!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">🏆 획득한 뱃지</h3>
        <span className="text-gray-600 text-sm">
          {userBadges.length}개 보유
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {userBadges.map((userBadge, index) => {
          const badge = userBadge.badge || userBadge;
          
          return (
            <div
              key={userBadge.id || index}
              className="relative group"
            >
              {/* 뱃지 카드 */}
              <div className={`bg-gradient-to-br ${getBadgeColor(index)} rounded-lg p-6 text-white text-center shadow-md hover:shadow-xl transition-all cursor-pointer`}>
                {/* 뱃지 아이콘 */}
                <div className="text-5xl mb-3">
                  {badge.icon || getBadgeIcon(badge.name)}
                </div>

                {/* 뱃지 이름 */}
                <h4 className="font-bold text-lg mb-1">{badge.name}</h4>

                {/* 획득 날짜 */}
                {userBadge.earnedAt && (
                  <p className="text-xs text-white text-opacity-80">
                    {new Date(userBadge.earnedAt).toLocaleDateString('ko-KR')}
                  </p>
                )}
              </div>

              {/* 호버 시 설명 툴팁 */}
              {badge.description && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-900 text-white text-sm rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                    {badge.description}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BadgesList;
