import React from 'react';

const StreakCard = ({ streak }) => {
  if (!streak) {
    return null;
  }

  const { currentStreak = 0, longestStreak = 0, lastActivityDate } = streak;

  // 오늘 날짜
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 마지막 활동 날짜
  const lastActivity = lastActivityDate ? new Date(lastActivityDate) : null;
  if (lastActivity) {
    lastActivity.setHours(0, 0, 0, 0);
  }

  // 스트릭이 끊어졌는지 확인
  const isStreakActive = lastActivity && (today - lastActivity) / (1000 * 60 * 60 * 24) <= 1;

  return (
    <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-lg p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">🔥 학습 스트릭</h3>
        {isStreakActive && currentStreak > 0 && (
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
            활성
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* 현재 스트릭 */}
        <div>
          <p className="text-white text-opacity-90 text-sm mb-1">현재 연속</p>
          <p className="text-4xl font-bold">{currentStreak}일</p>
        </div>

        {/* 최장 스트릭 */}
        <div>
          <p className="text-white text-opacity-90 text-sm mb-1">최장 기록</p>
          <p className="text-4xl font-bold">{longestStreak}일</p>
        </div>
      </div>

      {/* 마지막 활동 */}
      {lastActivityDate && (
        <div className="mt-4 pt-4 border-t border-white border-opacity-20">
          <p className="text-sm text-white text-opacity-80">
            마지막 활동: {new Date(lastActivityDate).toLocaleDateString('ko-KR')}
          </p>
        </div>
      )}

      {/* 스트릭 유지 메시지 */}
      {currentStreak > 0 && isStreakActive && (
        <div className="mt-4 bg-white bg-opacity-10 rounded-lg p-3">
          <p className="text-sm">
            💪 {currentStreak}일째 연속 학습 중! 내일도 학습해서 기록을 이어가세요!
          </p>
        </div>
      )}

      {/* 스트릭 끊김 메시지 */}
      {currentStreak === 0 && (
        <div className="mt-4 bg-white bg-opacity-10 rounded-lg p-3">
          <p className="text-sm">
            🌟 새로운 학습 스트릭을 시작해보세요!
          </p>
        </div>
      )}
    </div>
  );
};

export default StreakCard;
