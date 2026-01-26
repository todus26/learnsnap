import React, { useState, useEffect } from 'react';
import useAuthStore from '../../store/authStore';

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);

  // 상태 관리
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(false);

  // 기본 통계 데이터
  const stats = {
    completedVideos: 0,
    inProgressVideos: 0,
    totalWatchTime: 0,
    averageQuizScore: null
  };

  useEffect(() => {
    console.log('ProfilePage mounted, user:', user);
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">사용자 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">내 프로필</h1>

      {/* 프로필 정보 */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 bg-blue-500 rounded-full mr-6 flex items-center justify-center text-white text-3xl font-bold">
            {user.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{user.username || '사용자'}</h2>
            <p className="text-gray-600">{user.email || '이메일 없음'}</p>
            <p className="text-sm text-gray-500 mt-1">
              역할: {user.role === 'LEARNER' ? '학습자' : user.role === 'INSTRUCTOR' ? '강사' : '관리자'}
            </p>
          </div>
        </div>

        {user.bio && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-2">소개</h3>
            <p className="text-gray-700">{user.bio}</p>
          </div>
        )}
      </div>

      {/* API 미구현 안내 */}
      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-8">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-semibold text-yellow-800 mb-2">
              학습 진도 기능 준비 중
            </p>
            <p className="text-sm text-yellow-700">
              백엔드 API가 구현되면 학습 통계, 완료한 강의, 진행 중인 강의를 확인할 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="mb-6 border-b">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('stats')}
            className={`pb-4 px-2 font-semibold transition-colors ${
              activeTab === 'stats'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            학습 통계
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-4 px-2 font-semibold transition-colors ${
              activeTab === 'completed'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            완료한 강의 (0)
          </button>
          <button
            onClick={() => setActiveTab('in-progress')}
            className={`pb-4 px-2 font-semibold transition-colors ${
              activeTab === 'in-progress'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            진행 중인 강의 (0)
          </button>
        </div>
      </div>

      {/* 탭 콘텐츠 */}
      <div>
        {/* 학습 통계 탭 */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 완료한 강의 */}
            <div className="bg-green-50 border-2 border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">✅</span>
                <span className="text-3xl font-bold text-green-600">0</span>
              </div>
              <p className="text-gray-700 font-semibold">완료한 강의</p>
            </div>

            {/* 진행 중인 강의 */}
            <div className="bg-blue-50 border-2 border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">📚</span>
                <span className="text-3xl font-bold text-blue-600">0</span>
              </div>
              <p className="text-gray-700 font-semibold">진행 중인 강의</p>
            </div>

            {/* 총 시청 시간 */}
            <div className="bg-purple-50 border-2 border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">⏱️</span>
                <span className="text-3xl font-bold text-purple-600">0분</span>
              </div>
              <p className="text-gray-700 font-semibold">총 시청 시간</p>
            </div>

            {/* 평균 퀴즈 점수 */}
            <div className="bg-orange-50 border-2 border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">🎯</span>
                <span className="text-3xl font-bold text-orange-600">N/A</span>
              </div>
              <p className="text-gray-700 font-semibold">평균 퀴즈 점수</p>
            </div>
          </div>
        )}

        {/* 완료한 강의 탭 */}
        {activeTab === 'completed' && (
          <div className="text-center text-gray-500 py-8 border-2 border-dashed border-gray-300 rounded-lg">
            아직 완료한 강의가 없습니다. 강의를 시청하고 퀴즈를 풀어보세요!
          </div>
        )}

        {/* 진행 중인 강의 탭 */}
        {activeTab === 'in-progress' && (
          <div className="text-center text-gray-500 py-8 border-2 border-dashed border-gray-300 rounded-lg">
            진행 중인 강의가 없습니다. 새로운 강의를 시작해보세요!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
