import React from 'react';

const ProfileSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 스켈레톤 */}
      <div className="h-8 bg-gray-300 rounded w-48 mb-6 animate-pulse"></div>

      {/* 프로필 정보 스켈레톤 */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-8 animate-pulse">
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full mr-6"></div>
          <div className="flex-1">
            <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>

      {/* 탭 스켈레톤 */}
      <div className="mb-6 border-b">
        <div className="flex space-x-8">
          <div className="h-4 bg-gray-300 rounded w-16 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-20 mb-4"></div>
        </div>
      </div>

      {/* 콘텐츠 스켈레톤 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
        <div className="bg-white p-6 rounded-lg shadow-md h-48"></div>
        <div className="bg-white p-6 rounded-lg shadow-md h-48"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
