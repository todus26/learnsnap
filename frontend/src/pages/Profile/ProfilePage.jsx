import React, { useState, useEffect } from 'react';
import useAuthStore from '../../store/authStore';
import { getStreak, getPoints, getUserBadges } from '../../services/gamificationService';
import StreakCard from '../../components/gamification/StreakCard';
import PointsCard from '../../components/gamification/PointsCard';
import BadgesList from '../../components/gamification/BadgesList';

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);

  // 상태 관리
  const [streak, setStreak] = useState(null);
  const [points, setPoints] = useState(null);
  const [badges, setBadges] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [apiAvailable, setApiAvailable] = useState(false);

  // 게이미피케이션 데이터 불러오기
  const fetchGamificationData = async () => {
    setLoading(true);

    try {
      // 스트릭 정보
      const streakData = await getStreak();
      setStreak(streakData);

      // 포인트 정보
      const pointsData = await getPoints();
      setPoints(pointsData);

      // 뱃지 정보
      const badgesData = await getUserBadges();
      setBadges(Array.isArray(badgesData) ? badgesData : []);

      // 데이터가 있으면 API 사용 가능
      if (streakData.currentStreak > 0 || pointsData.totalPoints > 0 || badgesData.length > 0) {
        setApiAvailable(true);
      }
    } catch (err) {
      console.error('게이미피케이션 데이터 불러오기 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchGamificationData();
    }
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
            
            {/* 레벨 및 포인트 간단 표시 */}
            {points && (
              <div className="flex items-center gap-4 mt-3">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Lv.{points.level || 1}
                </span>
                <span className="text-gray-600 text-sm">
                  {points.totalPoints?.toLocaleString() || 0} 포인트
                </span>
              </div>
            )}
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
      {!loading && !apiAvailable && (
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-semibold text-yellow-800 mb-2">
                게이미피케이션 기능 준비 중
              </p>
              <p className="text-sm text-yellow-700">
                백엔드 API가 구현되면 스트릭, 포인트, 뱃지 시스템을 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 탭 네비게이션 */}
      <div className="mb-6 border-b">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-4 px-2 font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            개요
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`pb-4 px-2 font-semibold transition-colors ${
              activeTab === 'badges'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            뱃지 ({badges.length})
          </button>
        </div>
      </div>

      {/* 로딩 중 */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">데이터를 불러오는 중...</p>
          </div>
        </div>
      )}

      {/* 탭 콘텐츠 */}
      {!loading && (
        <div>
          {/* 개요 탭 */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 스트릭 & 포인트 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StreakCard streak={streak} />
                <PointsCard points={points} />
              </div>

              {/* 최근 획득 뱃지 (최대 4개) */}
              {badges.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">최근 획득한 뱃지</h3>
                    <button
                      onClick={() => setActiveTab('badges')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                    >
                      전체 보기 →
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {badges.slice(0, 4).map((badge, index) => (
                      <div
                        key={badge.id || index}
                        className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-6 text-white text-center shadow-md"
                      >
                        <div className="text-4xl mb-2">
                          {badge.badge?.icon || '🏆'}
                        </div>
                        <h4 className="font-bold">{badge.badge?.name || '뱃지'}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 뱃지 탭 */}
          {activeTab === 'badges' && (
            <BadgesList userBadges={badges} />
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
