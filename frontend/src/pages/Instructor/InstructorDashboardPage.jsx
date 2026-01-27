import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { getVideosByInstructor, deleteVideo } from '../../services/videoService';
import { useToast } from '../../contexts/ToastContext';

const InstructorDashboardPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { showSuccess, showError } = useToast();

  // 상태 관리
  const [videos, setVideos] = useState([]);
  const [stats, setStats] = useState({
    totalVideos: 0,
    totalViews: 0,
    totalLikes: 0,
    averageRating: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 권한 체크
  useEffect(() => {
    if (user && user.role !== 'INSTRUCTOR' && user.role !== 'ADMIN') {
      alert('강사 권한이 필요합니다.');
      navigate('/');
    }
  }, [user, navigate]);

  // 데이터 불러오기
  const fetchVideos = async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getVideosByInstructor(user.id);
      const videoList = Array.isArray(data) ? data : data.content || [];
      setVideos(videoList);

      // 통계 계산
      const totalViews = videoList.reduce((sum, v) => sum + (v.viewsCount || 0), 0);
      const totalLikes = videoList.reduce((sum, v) => sum + (v.likesCount || 0), 0);

      setStats({
        totalVideos: videoList.length,
        totalViews,
        totalLikes,
        averageRating: 0 // 추후 구현
      });
    } catch (err) {
      console.error('비디오 불러오기 실패:', err);
      setError('비디오를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchVideos();
    }
  }, [user]);

  // 비디오 삭제
  const handleDeleteVideo = async (videoId, videoTitle) => {
    if (!window.confirm(`"${videoTitle}" 비디오를 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await deleteVideo(videoId);
      showSuccess('비디오가 삭제되었습니다.');
      fetchVideos(); // 목록 새로고침
    } catch (err) {
      console.error('비디오 삭제 실패:', err);
      showError('비디오 삭제에 실패했습니다.');
    }
  };

  // 난이도 배지 색상
  const getDifficultyBadgeColor = (level) => {
    switch (level) {
      case 'BEGINNER':
        return 'bg-green-100 text-green-800';
      case 'INTERMEDIATE':
        return 'bg-yellow-100 text-yellow-800';
      case 'ADVANCED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 난이도 한글 변환
  const getDifficultyText = (level) => {
    switch (level) {
      case 'BEGINNER':
        return '초급';
      case 'INTERMEDIATE':
        return '중급';
      case 'ADVANCED':
        return '고급';
      default:
        return level;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">📊 강사 대시보드</h1>
          <p className="text-gray-600">
            내 강의를 관리하고 통계를 확인하세요.
          </p>
        </div>
        <Link
          to="/instructor/upload"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-semibold transition-colors"
        >
          + 새 비디오 업로드
        </Link>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* 총 비디오 수 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl">📹</span>
            <span className="text-3xl font-bold text-blue-600">
              {stats.totalVideos}
            </span>
          </div>
          <p className="text-gray-700 font-semibold">총 비디오</p>
        </div>

        {/* 총 조회수 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl">👁️</span>
            <span className="text-3xl font-bold text-green-600">
              {stats.totalViews.toLocaleString()}
            </span>
          </div>
          <p className="text-gray-700 font-semibold">총 조회수</p>
        </div>

        {/* 총 좋아요 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl">❤️</span>
            <span className="text-3xl font-bold text-red-600">
              {stats.totalLikes.toLocaleString()}
            </span>
          </div>
          <p className="text-gray-700 font-semibold">총 좋아요</p>
        </div>

        {/* 평균 평점 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl">⭐</span>
            <span className="text-3xl font-bold text-yellow-600">
              {stats.averageRating.toFixed(1)}
            </span>
          </div>
          <p className="text-gray-700 font-semibold">평균 평점</p>
        </div>
      </div>

      {/* 로딩 중 */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">비디오를 불러오는 중...</p>
          </div>
        </div>
      )}

      {/* 에러 */}
      {error && !loading && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchVideos}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            다시 시도
          </button>
        </div>
      )}

      {/* 비디오 목록 */}
      {!loading && !error && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h2 className="text-xl font-bold">내 비디오 목록</h2>
          </div>

          {videos.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-xl mb-2">아직 업로드한 비디오가 없습니다</p>
              <p className="text-sm mb-4">
                첫 번째 강의를 업로드하고 학습자들과 공유해보세요!
              </p>
              <Link
                to="/instructor/upload"
                className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                비디오 업로드
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      비디오
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      난이도
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      조회수
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      좋아요
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      업로드 날짜
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((video) => (
                    <tr key={video.id} className="border-b hover:bg-gray-50">
                      {/* 비디오 정보 */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          {/* 썸네일 */}
                          <div className="w-24 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                            {video.thumbnailUrl ? (
                              <img
                                src={video.thumbnailUrl}
                                alt={video.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                📹
                              </div>
                            )}
                          </div>
                          {/* 제목 및 설명 */}
                          <div>
                            <Link
                              to={`/videos/${video.id}`}
                              className="font-semibold text-gray-900 hover:text-blue-600"
                            >
                              {video.title}
                            </Link>
                            <p className="text-sm text-gray-500 line-clamp-1">
                              {video.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* 난이도 */}
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyBadgeColor(
                            video.difficultyLevel
                          )}`}
                        >
                          {getDifficultyText(video.difficultyLevel)}
                        </span>
                      </td>

                      {/* 조회수 */}
                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold">
                          {video.viewsCount?.toLocaleString() || 0}
                        </span>
                      </td>

                      {/* 좋아요 */}
                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold">
                          {video.likesCount?.toLocaleString() || 0}
                        </span>
                      </td>

                      {/* 업로드 날짜 */}
                      <td className="px-6 py-4 text-center text-sm text-gray-600">
                        {video.createdAt
                          ? new Date(video.createdAt).toLocaleDateString('ko-KR')
                          : '-'}
                      </td>

                      {/* 관리 버튼 */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/videos/${video.id}`}
                            className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                          >
                            보기
                          </Link>
                          <button
                            onClick={() => handleDeleteVideo(video.id, video.title)}
                            className="text-red-600 hover:text-red-700 font-semibold text-sm"
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InstructorDashboardPage;
