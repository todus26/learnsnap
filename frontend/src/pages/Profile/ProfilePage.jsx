import React from 'react';

const ProfilePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">내 프로필</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl">
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full mr-6"></div>
          <div>
            <h2 className="text-2xl font-semibold">사용자 이름</h2>
            <p className="text-gray-600">user@example.com</p>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">학습 통계</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">15</p>
              <p className="text-gray-600">완료한 강의</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">7</p>
              <p className="text-gray-600">연속 학습일</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">250</p>
              <p className="text-gray-600">포인트</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;