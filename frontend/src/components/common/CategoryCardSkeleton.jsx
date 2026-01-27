import React from 'react';

const CategoryCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      {/* 아이콘 영역 */}
      <div className="flex items-center justify-center mb-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
      </div>

      {/* 제목 */}
      <div className="h-6 bg-gray-300 rounded mb-2"></div>

      {/* 비디오 개수 */}
      <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
    </div>
  );
};

// 여러 개의 스켈레톤을 렌더링하는 컴포넌트
export const CategoryCardSkeletonList = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <CategoryCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default CategoryCardSkeleton;
