import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getVideoById, incrementViews, getVideosByCategory } from '../../services/videoService';
import { markVideoAsCompleted, getVideoProgress } from '../../services/userProgressService';
import useAuthStore from '../../store/authStore';
import VideoPlayer from '../../components/video/VideoPlayer';
import RecommendedVideos from '../../components/video/RecommendedVideos';
import Quiz from '../../components/quiz/Quiz';

const VideoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // 상태 관리
  const [video, setVideo] = useState(null);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [markingComplete, setMarkingComplete] = useState(false);

  // 난이도 한글 변환
  const getDifficultyText = (level) => {
    const difficultyMap = {
      'BEGINNER': '초급',
      'INTERMEDIATE': '중급',
      'ADVANCED': '고급'
    };
    return difficultyMap[level] || level;
  };

  // 난이도별 색상
  const getDifficultyColor = (level) => {
    const colorMap = {
      'BEGINNER': 'bg-green-100 text-green-800',
      'INTERMEDIATE': 'bg-yellow-100 text-yellow-800',
      'ADVANCED': 'bg-red-100 text-red-800'
    };
    return colorMap[level] || 'bg-gray-100 text-gray-800';
  };

  // 비디오 정보 불러오기
  const fetchVideo = async () => {
    setLoading(true);
    setError(null);

    try {
      // 비디오 정보 가져오기
      const videoData = await getVideoById(id);
      setVideo(videoData);

      // 조회수 증가
      try {
        await incrementViews(id);
      } catch (err) {
        console.error('조회수 증가 실패:', err);
      }

      // 로그인한 사용자라면 학습 진도 확인
      if (isAuthenticated) {
        try {
          const progress = await getVideoProgress(id);
          setIsCompleted(progress?.completed || false);
        } catch (err) {
          console.error('학습 진도 확인 실패:', err);
          setIsCompleted(false);
        }
      }

      // 추천 비디오 가져오기
      if (videoData.category?.id) {
        try {
          const recommended = await getVideosByCategory(videoData.category.id, {
            page: 0,
            size: 5
          });

          const filteredVideos = (recommended.content || recommended)
            .filter(v => v.id !== videoData.id)
            .slice(0, 4);

          setRecommendedVideos(filteredVideos);
        } catch (err) {
          console.error('추천 비디오 불러오기 실패:', err);
          setRecommendedVideos([]);
        }
      }
    } catch (err) {
      console.error('비디오 불러오기 실패:', err);
      
      if (err.response?.status === 404 || err.status === 404) {
        setError('비디오를 찾을 수 없습니다.');
      } else {
        setError('비디오를 불러오는 데 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  // 완료 표시 핸들러
  const handleMarkComplete = async () => {
    if (!isAuthenticated) {
      alert('로그인이 필요합니다!');
      navigate('/login');
      return;
    }

    setMarkingComplete(true);

    try {
      await markVideoAsCompleted(id);
      setIsCompleted(true);
      alert('✅ 강의를 완료했습니다!');
    } catch (err) {
      console.error('완료 표시 실패:', err);
      alert('완료 표시에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setMarkingComplete(false);
    }
  };

  // 컴포넌트 마운트 시 & ID 변경 시
  useEffect(() => {
    fetchVideo();
    window.scrollTo(0, 0);
  }, [id, isAuthenticated]);

  // 로딩 중
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">비디오를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <div className="space-x-4">
              <button
                onClick={() => fetchVideo()}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                다시 시도
              </button>
              <button
                onClick={() => navigate('/videos')}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                목록으로
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!video) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-gray-600 hover:text-gray-800 flex items-center gap-2"
      >
        ← 뒤로가기
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 메인 콘텐츠 */}
        <div className="lg:col-span-2">
          {/* 비디오 플레이어 */}
          <VideoPlayer
            videoUrl={video.videoUrl}
            thumbnailUrl={video.thumbnailUrl}
            title={video.title}
          />

          {/* 완료 버튼 */}
          {isAuthenticated && (
            <div className="mt-4">
              {isCompleted ? (
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✅</span>
                    <span className="text-green-800 font-semibold">
                      이 강의를 완료했습니다!
                    </span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleMarkComplete}
                  disabled={markingComplete}
                  className={`w-full py-3 rounded-lg font-semibold ${
                    markingComplete
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white`}
                >
                  {markingComplete ? '처리 중...' : '✓ 강의 완료 표시'}
                </button>
              )}
            </div>
          )}

          {/* 비디오 정보 */}
          <div className="mt-6">
            <h1 className="text-3xl font-bold mb-4">{video.title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-600">
              <span>조회수 {video.viewsCount?.toLocaleString() || 0}회</span>
              <span>❤️ {video.likesCount?.toLocaleString() || 0}</span>
              {video.duration && (
                <span>
                  {Math.floor(video.duration / 60)}분 {video.duration % 60}초
                </span>
              )}
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(video.difficultyLevel)}`}>
                {getDifficultyText(video.difficultyLevel)}
              </span>
              {video.category && (
                <Link
                  to={`/videos?category=${video.category.id}`}
                  className="text-blue-600 hover:underline"
                >
                  #{video.category.name}
                </Link>
              )}
            </div>

            <hr className="my-6" />

            {/* 강사 정보 */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {video.instructor?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <p className="font-semibold text-lg">
                  {video.instructor?.username || '익명'}
                </p>
                <p className="text-sm text-gray-600">강사</p>
              </div>
            </div>

            <hr className="my-6" />

            {/* 설명 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">설명</h2>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {video.description || '설명이 없습니다.'}
              </p>
            </div>

            {video.createdAt && (
              <div className="mt-6 text-sm text-gray-500">
                업로드: {new Date(video.createdAt).toLocaleDateString('ko-KR')}
              </div>
            )}
          </div>

          {/* 퀴즈 섹션 */}
          <div className="mt-10 pt-8 border-t">
            <Quiz videoId={video.id} />
          </div>
        </div>

        {/* 사이드바 - 추천 비디오 */}
        <div>
          <h3 className="text-xl font-semibold mb-4">추천 비디오</h3>
          <RecommendedVideos videos={recommendedVideos} />
        </div>
      </div>
    </div>
  );
};

export default VideoDetailPage;
