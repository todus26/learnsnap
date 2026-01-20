import React from 'react';

const VideosPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">모든 비디오</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="border rounded-lg overflow-hidden shadow-sm">
            <div className="bg-gray-200 h-48"></div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">비디오 제목 {item}</h3>
              <p className="text-sm text-gray-600">강사명</p>
              <p className="text-sm text-gray-500 mt-2">조회수 150회</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosPage;