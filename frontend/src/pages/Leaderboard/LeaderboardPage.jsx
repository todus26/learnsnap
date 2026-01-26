import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../../services/gamificationService';
import useAuthStore from '../../store/authStore';

const LeaderboardPage = () => {
  const user = useAuthStore((state) => state.user);

  // 상태 관리
  const [period, setPeriod] = useState('WEEKLY'); // 'WEEKLY' or 'MONTHLY'
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 리더보드 데이터 불러오기
  const fetchLeaderboard = async (selectedPeriod) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getLeaderboard(selectedPeriod);
      setLeaderboardData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('리더보드 불러오기 실패:', err);
      setError('리더보드를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard(period);
  }, [period]);

  // 기간 변경 핸들러
  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  // 내 순위 찾기
  const myRank = leaderboardData.find(
    (entry) => entry.user?.id === user?.id || entry.userId === user?.id
  );

  // 메달 아이콘
  const getMedalIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  // 순위 배경색
  const getRankBgColor = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-100 to-yellow-50';
    if (rank === 2) return 'bg-gradient-to-r from-gray-100 to-gray-50';
    if (rank === 3) return 'bg-gradient-to-r from-orange-100 to-orange-50';
    return 'bg-white';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🏆 리더보드</h1>
        <p className="text-gray-600">
          최고의 학습자들과 경쟁하고 순위를 확인하세요!
        </p>
      </div>

      {/* 기간 선택 탭 */}
      <div className="mb-6 border-b">
        <div className="flex space-x-8">
          <button
            onClick={() => handlePeriodChange('WEEKLY')}
            className={`pb-4 px-2 font-semibold transition-colors ${
              period === 'WEEKLY'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            주간 랭킹
          </button>
          <button
            onClick={() => handlePeriodChange('MONTHLY')}
            className={`pb-4 px-2 font-semibold transition-colors ${
              period === 'MONTHLY'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            월간 랭킹
          </button>
        </div>
      </div>

      {/* 내 순위 카드 */}
      {user && myRank && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-blue-600">
                #{myRank.rank}
              </div>
              <div>
                <p className="font-semibold text-lg">{user.username}</p>
                <p className="text-sm text-gray-600">내 순위</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">
                {myRank.points?.toLocaleString() || 0}
              </p>
              <p className="text-sm text-gray-600">포인트</p>
            </div>
          </div>
        </div>
      )}

      {/* 로딩 중 */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">리더보드를 불러오는 중...</p>
          </div>
        </div>
      )}

      {/* 에러 */}
      {error && !loading && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => fetchLeaderboard(period)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            다시 시도
          </button>
        </div>
      )}

      {/* 리더보드 목록 */}
      {!loading && !error && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {leaderboardData.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-xl mb-2">아직 랭킹 데이터가 없습니다</p>
              <p className="text-sm">
                학습을 시작하고 첫 번째 순위에 올라보세요!
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    순위
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    사용자
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    포인트
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    레벨
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry, index) => {
                  const isCurrentUser =
                    entry.user?.id === user?.id || entry.userId === user?.id;

                  return (
                    <tr
                      key={entry.id || index}
                      className={`border-b transition-colors ${getRankBgColor(
                        entry.rank
                      )} ${
                        isCurrentUser
                          ? 'border-l-4 border-l-blue-500'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {/* 순위 */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getMedalIcon(entry.rank) && (
                            <span className="text-2xl">
                              {getMedalIcon(entry.rank)}
                            </span>
                          )}
                          <span className="font-bold text-lg">
                            #{entry.rank}
                          </span>
                        </div>
                      </td>

                      {/* 사용자 */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            {entry.user?.username?.charAt(0).toUpperCase() ||
                              'U'}
                          </div>
                          <div>
                            <p className="font-semibold">
                              {entry.user?.username || '사용자'}
                              {isCurrentUser && (
                                <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  나
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* 포인트 */}
                      <td className="px-6 py-4 text-right">
                        <span className="font-bold text-lg">
                          {entry.points?.toLocaleString() || 0}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">pt</span>
                      </td>

                      {/* 레벨 */}
                      <td className="px-6 py-4 text-center">
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                          Lv.{entry.user?.level || entry.level || 1}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* API 미구현 안내 */}
      {!loading && leaderboardData.length === 0 && !error && (
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mt-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-semibold text-yellow-800 mb-2">
                리더보드 기능 준비 중
              </p>
              <p className="text-sm text-yellow-700">
                백엔드에 리더보드 API가 구현되면 실시간 랭킹을 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage;
