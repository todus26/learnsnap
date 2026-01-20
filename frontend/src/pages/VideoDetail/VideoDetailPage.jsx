import React from 'react';
import { useParams } from 'react-router-dom';

const VideoDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">비디오 상세 (ID: {id})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-200 h-96 rounded-lg mb-4"></div>
          <h2 className="text-2xl font-semibold mb-2">비디오 제목</h2>
          <p className="text-gray-600 mb-4">강사: 홍길동</p>
          <p className="text-gray-700">
            이것은 비디오 설명입니다. 자세한 내용은 API 연동 후 표시됩니다.
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4">추천 비디오</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border rounded-lg p-3">
                <div className="bg-gray-200 h-24 rounded mb-2"></div>
                <p className="font-semibold text-sm">추천 비디오 {item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailPage;