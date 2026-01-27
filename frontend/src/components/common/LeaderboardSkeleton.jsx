import React from 'react';

const LeaderboardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-4 text-left">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </th>
            <th className="px-6 py-4 text-left">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </th>
            <th className="px-6 py-4 text-right">
              <div className="h-4 bg-gray-300 rounded w-20 ml-auto"></div>
            </th>
            <th className="px-6 py-4 text-center">
              <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index} className="border-b animate-pulse">
              {/* 순위 */}
              <td className="px-6 py-4">
                <div className="h-6 bg-gray-200 rounded w-12"></div>
              </td>

              {/* 사용자 */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                </div>
              </td>

              {/* 포인트 */}
              <td className="px-6 py-4 text-right">
                <div className="h-5 bg-gray-200 rounded w-20 ml-auto"></div>
              </td>

              {/* 레벨 */}
              <td className="px-6 py-4 text-center">
                <div className="h-6 bg-gray-200 rounded w-16 mx-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardSkeleton;
