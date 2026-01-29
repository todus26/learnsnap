import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 px-4">
      <div className="max-w-lg w-full text-center">
        {/* 403 일러스트레이션 */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-error-600 mb-4">403</div>
          <div className="w-24 h-24 mx-auto bg-error-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
        </div>

        {/* 메시지 */}
        <h1 className="text-4xl font-bold text-secondary-900 mb-4">
          접근 권한이 없습니다
        </h1>
        <p className="text-lg text-secondary-600 mb-8">
          이 페이지에 접근할 수 있는 권한이 없습니다.
          <br />
          로그인하거나 적절한 권한을 요청하세요.
        </p>

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate(-1)}
          >
            이전 페이지
          </Button>
          <Link to="/login">
            <Button variant="primary" size="lg">
              로그인
            </Button>
          </Link>
        </div>

        {/* 추가 정보 */}
        <div className="mt-12 pt-8 border-t border-secondary-200">
          <p className="text-sm text-secondary-600 mb-4">
            강사 또는 관리자 권한이 필요한 페이지입니다.
          </p>
          <Link to="/" className="text-primary-600 hover:text-primary-700 hover:underline font-medium">
            홈으로 이동
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
