import React from 'react';

const PointsCard = ({ points }) => {
  if (!points) {
    return null;
  }

  const { totalPoints = 0, level = 1 } = points;

  // 레벨별 필요 포인트 (간단한 계산식)
  const getPointsForLevel = (lvl) => {
    return lvl * 100;
  };

  // 현재 레벨의 진행률
  const currentLevelPoints = getPointsForLevel(level - 1);
  const nextLevelPoints = getPointsForLevel(level);
  const pointsInCurrentLevel = totalPoints - currentLevelPoints;
  const pointsNeededForLevel = nextLevelPoints - currentLevelPoints;
  const progress = Math.min((pointsInCurrentLevel / pointsNeededForLevel) * 100, 100);

  // 레벨별 칭호
  const getLevelTitle = (lvl) => {
    if (lvl >= 50) return '마스터';
    if (lvl >= 30) return '전문가';
    if (lvl >= 20) return '숙련자';
    if (lvl >= 10) return '중급자';
    if (lvl >= 5) return '초보자';
    return '입문자';
  };

  return (
    <div className="bg-gradient-to-br from-purple-400 to-indigo-600 rounded-lg p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">⭐ 포인트 & 레벨</h3>
        <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
          Lv.{level}
        </span>
      </div>

      {/* 레벨 칭호 */}
      <div className="mb-4">
        <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-lg font-bold">
          {getLevelTitle(level)}
        </span>
      </div>

      {/* 총 포인트 */}
      <div className="mb-4">
        <p className="text-white text-opacity-90 text-sm mb-1">총 포인트</p>
        <p className="text-4xl font-bold">{totalPoints.toLocaleString()}</p>
      </div>

      {/* 레벨 진행률 */}
      <div className="mb-2">
        <div className="flex items-center justify-between text-sm mb-1">
          <span>다음 레벨까지</span>
          <span className="font-semibold">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
          <div
            className="bg-white rounded-full h-3 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-xs text-white text-opacity-80 mt-1">
          {pointsInCurrentLevel} / {pointsNeededForLevel} 포인트
        </p>
      </div>

      {/* 다음 레벨 정보 */}
      <div className="mt-4 bg-white bg-opacity-10 rounded-lg p-3">
        <p className="text-sm">
          🎯 레벨 {level + 1}까지 {nextLevelPoints - totalPoints}포인트 남음!
        </p>
      </div>
    </div>
  );
};

export default PointsCard;
