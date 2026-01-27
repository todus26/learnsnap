import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ServerErrorPage = () => {
  const navigate = useNavigate();

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 px-4">
      <div className="max-w-lg w-full text-center">
        {/* 500 일러스트레이션 */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-purple-500 mb-4">500</div>
          <div className="text-6xl mb-4">🔧</div>
        </div>

        {/* 메시지 */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          서버 오류가 발생했습니다
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          서버에서 예상치 못한 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </p>

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleReload}
            className="bg-purple-500 text-white px-8 py-3 rounded-lg hover:bg-purple-600 font-semibold transition-colors"
          >
            🔄 페이지 새로고침
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
          >
            ← 이전 페이지
          </button>
        </div>

        {/* 홈 링크 */}
        <div className="mt-8">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            🏠 홈으로 이동
          </Link>
        </div>

        {/* 추가 정보 */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-sm text-gray-600 mb-2">
            문제가 계속되면 고객 지원팀에 문의해주세요.
          </p>
          <p className="text-xs text-gray-500">
            에러 코드: 500 - Internal Server Error
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServerErrorPage;
