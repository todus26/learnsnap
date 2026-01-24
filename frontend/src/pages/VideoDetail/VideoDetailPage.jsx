import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getVideoById, incrementViews, getVideosByCategory } from '../../services/videoService';
import VideoPlayer from '../../components/video/VideoPlayer';
import RecommendedVideos from '../../components/video/RecommendedVideos';

const VideoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 상태 관리
  const [video, setVideo] = useState(null);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        // 조회수 증가 실패는 무시
      }

      // 추천 비디오 가져오기 (같은 카테고리)
      if (videoData.category?.id) {
        try {
          const recommended = await getVideosByCategory(videoData.category.id, {
            page: 0,
            size: 5
          });

          // 현재 비디오 제외
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
      
      // 404 에러 처리
      if (err.response?.status === 404 || err.status === 404) {
        setError('비디오를 찾을 수 없습니다.');
      } else {
        setError('비디오를 불러오는 데 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 & ID 변경 시
  useEffect(() => {
    fetchVideo();
    window.scrollTo(0, 0);
  }, [id]);

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

  // 비디오 정보 없음 (혹시 모를 경우)
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

          {/* 비디오 정보 */}
          <div className="mt-6">
            {/* 제목 */}
            <h1 className="text-3xl font-bold mb-4">{video.title}</h1>

            {/* 메타 정보 */}
            <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-600">
              {/* 조회수 */}
              <span>조회수 {video.viewsCount?.toLocaleString() || 0}회</span>

              {/* 좋아요 */}
              <span>❤️ {video.likesCount?.toLocaleString() || 0}</span>

              {/* 재생 시간 */}
              {video.duration && (
                <span>
                  {Math.floor(video.duration / 60)}분 {video.duration % 60}초
                </span>
              )}

              {/* 난이도 */}
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(video.difficultyLevel)}`}>
                {getDifficultyText(video.difficultyLevel)}
              </span>

              {/* 카테고리 */}
              {video.category && (
                <Link
                  to={`/videos?category=${video.category.id}`}
                  className="text-blue-600 hover:underline"
                >
                  #{video.category.name}
                </Link>
              )}
            </div>

            {/* 구분선 */}
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

            {/* 구분선 */}
            <hr className="my-6" />

            {/* 설명 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">설명</h2>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {video.description || '설명이 없습니다.'}
              </p>
            </div>

            {/* 생성일 */}
            {video.createdAt && (
              <div className="mt-6 text-sm text-gray-500">
                업로드: {new Date(video.createdAt).toLocaleDateString('ko-KR')}
              </div>
            )}
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
