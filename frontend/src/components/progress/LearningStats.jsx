import React from 'react';

const LearningStats = ({ stats }) => {
  if (!stats) {
    return (
      <div className="text-center text-gray-500 py-8">
        학습 통계를 불러올 수 없습니다.
      </div>
    );
  }

  const statItems = [
    {
      label: '완료한 강의',
      value: stats.completedVideos || 0,
      icon: '✅',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: '진행 중인 강의',
      value: stats.inProgressVideos || 0,
      icon: '📚',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: '총 시청 시간',
      value: stats.totalWatchTime ? `${Math.floor(stats.totalWatchTime / 60)}분` : '0분',
      icon: '⏱️',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: '평균 퀴즈 점수',
      value: stats.averageQuizScore ? `${Math.round(stats.averageQuizScore)}점` : 'N/A',
      icon: '🎯',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <div
          key={index}
          className={`${item.bgColor} border-2 border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl">{item.icon}</span>
            <span className={`text-3xl font-bold ${item.color}`}>
              {item.value}
            </span>
          </div>
          <p className="text-gray-700 font-semibold">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default LearningStats;
