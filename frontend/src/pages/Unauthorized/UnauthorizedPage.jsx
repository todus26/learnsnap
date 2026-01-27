import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 px-4">
      <div className="max-w-lg w-full text-center">
        {/* 403 일러스트레이션 */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-red-500 mb-4">403</div>
          <div className="text-6xl mb-4">🚫</div>
        </div>

        {/* 메시지 */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          접근 권한이 없습니다
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          이 페이지에 접근할 수 있는 권한이 없습니다.
          <br />
          로그인하거나 적절한 권한을 요청하세요.
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
            to="/login"
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 font-semibold transition-colors"
          >
            🔐 로그인
          </Link>
        </div>

        {/* 추가 정보 */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-sm text-gray-600 mb-4">
            강사 또는 관리자 권한이 필요한 페이지입니다.
          </p>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            홈으로 이동 →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
