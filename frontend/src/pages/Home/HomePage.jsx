import React from 'react';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">LearnSnap에 오신 것을 환영합니다! 🎉</h1>
      <p className="text-xl text-gray-600 mb-8">
        전문 지식을 짧은 영상 콘텐츠로 학습하세요
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">💻 백엔드</h3>
          <p className="text-gray-600">Node.js, Python, Java, Spring Boot</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">🎨 프론트엔드</h3>
          <p className="text-gray-600">React, Vue, JavaScript</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">🚀 DevOps</h3>
          <p className="text-gray-600">Docker, Kubernetes, CI/CD</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;