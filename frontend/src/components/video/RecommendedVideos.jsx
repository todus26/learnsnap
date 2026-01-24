import React from 'react';
import { Link } from 'react-router-dom';

const RecommendedVideos = ({ videos }) => {
  if (!videos || videos.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        추천 비디오가 없습니다
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <Link
          key={video.id}
          to={`/videos/${video.id}`}
          className="block border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="flex gap-3 p-3">
            {/* 썸네일 */}
            <div className="flex-shrink-0 w-32 h-20">
              {video.thumbnailUrl ? (
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded flex items-center justify-center">
                  <span className="text-white text-2xl">🎥</span>
                </div>
              )}
            </div>

            {/* 정보 */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm line-clamp-2 mb-1 hover:text-blue-600">
                {video.title}
              </h4>
              <p className="text-xs text-gray-600 mb-1">
                {video.instructor?.username || '익명'}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>조회수 {video.viewsCount?.toLocaleString() || 0}</span>
                {video.duration && (
                  <span>
                    {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecommendedVideos;
