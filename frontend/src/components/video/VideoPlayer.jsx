import React from 'react';

const VideoPlayer = ({ videoUrl, thumbnailUrl, title }) => {
  // 실제 비디오 URL이 있으면 video 태그 사용
  // 없으면 썸네일만 표시
  
  if (!videoUrl) {
    return (
      <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
        {thumbnailUrl ? (
          <img 
            src={thumbnailUrl} 
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-white">
              <span className="text-6xl mb-4 block">🎥</span>
              <p className="text-lg">비디오를 불러올 수 없습니다</p>
            </div>
          </div>
        )}
        
        {/* 재생 버튼 오버레이 */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
            <span className="text-4xl text-gray-800">▶</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
      <video
        controls
        className="w-full h-full"
        poster={thumbnailUrl}
      >
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/webm" />
        <source src={videoUrl} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
