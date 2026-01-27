import React from 'react';

const VideoCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* 썸네일 스켈레톤 */}
      <div className="aspect-video bg-gray-300"></div>

      {/* 콘텐츠 스켈레톤 */}
      <div className="p-4">
        {/* 제목 */}
        <div className="h-5 bg-gray-300 rounded mb-3"></div>
        
        {/* 설명 */}
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>

        {/* 강사 및 메타 정보 */}
        <div className="flex items-center justify-between">
          <div className="h-3 bg-gray-200 rounded w-24"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
};

// 여러 개의 스켈레톤을 렌더링하는 컴포넌트
export const VideoCardSkeletonList = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <VideoCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default VideoCardSkeleton;
