import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
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

  return (
    <Link 
      to={`/videos/${video.id}`}
      className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* 썸네일 */}
      <div className="relative">
        {video.thumbnailUrl ? (
          <img 
            src={video.thumbnailUrl} 
            alt={video.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-4xl">🎥</span>
          </div>
        )}
        
        {/* 난이도 뱃지 */}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(video.difficultyLevel)}`}>
            {getDifficultyText(video.difficultyLevel)}
          </span>
        </div>

        {/* 재생 시간 */}
        {video.duration && (
          <div className="absolute bottom-2 right-2">
            <span className="px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded">
              {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}
            </span>
          </div>
        )}
      </div>

      {/* 비디오 정보 */}
      <div className="p-4">
        {/* 제목 */}
        <h3 className="font-semibold mb-2 line-clamp-2 hover:text-blue-600">
          {video.title}
        </h3>

        {/* 강사명 */}
        <p className="text-sm text-gray-600 mb-1">
          {video.instructor?.username || '익명'}
        </p>

        {/* 카테고리 */}
        {video.category && (
          <p className="text-xs text-blue-600 mb-2">
            {video.category.name}
          </p>
        )}

        {/* 조회수 및 좋아요 */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>조회수 {video.viewsCount?.toLocaleString() || 0}회</span>
          <span>❤️ {video.likesCount?.toLocaleString() || 0}</span>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
