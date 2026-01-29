import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

const ServerErrorPage = () => {
  const navigate = useNavigate();

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 px-4">
      <div className="max-w-lg w-full text-center">
        {/* 500 일러스트레이션 */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-warning-600 mb-4">500</div>
          <div className="w-24 h-24 mx-auto bg-warning-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>

        {/* 메시지 */}
        <h1 className="text-4xl font-bold text-secondary-900 mb-4">
          서버 오류가 발생했습니다
        </h1>
        <p className="text-lg text-secondary-600 mb-8">
          서버에서 예상치 못한 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </p>

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleReload}
          >
            페이지 새로고침
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate(-1)}
          >
            이전 페이지
          </Button>
        </div>

        {/* 홈 링크 */}
        <div className="mt-8">
          <Link to="/" className="text-primary-600 hover:text-primary-700 hover:underline font-medium">
            홈으로 이동
          </Link>
        </div>

        {/* 추가 정보 */}
        <div className="mt-12 pt-8 border-t border-secondary-200">
          <p className="text-sm text-secondary-600 mb-2">
            문제가 계속되면 고객 지원팀에 문의해주세요.
          </p>
          <p className="text-xs text-secondary-500">
            에러 코드: 500 - Internal Server Error
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServerErrorPage;
