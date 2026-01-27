import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 일러스트레이션 */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-blue-500 mb-4">404</div>
          <div className="text-6xl mb-4">🔍</div>
        </div>

        {/* 메시지 */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
          >
            ← 이전 페이지
          </button>
          <Link
            to="/"
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 font-semibold transition-colors"
          >
            🏠 홈으로 이동
          </Link>
        </div>

        {/* 추천 링크 */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-sm text-gray-600 mb-4">다음 페이지를 방문해보세요:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/videos"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              📹 비디오 목록
            </Link>
            <Link
              to="/categories"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              📚 카테고리
            </Link>
            <Link
              to="/leaderboard"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              🏆 리더보드
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
