import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 일러스트레이션 */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-primary-600 mb-4">404</div>
          <div className="w-24 h-24 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* 메시지 */}
        <h1 className="text-4xl font-bold text-secondary-900 mb-4">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-lg text-secondary-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
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
          <Link to="/">
            <Button variant="primary" size="lg">
              홈으로 이동
            </Button>
          </Link>
        </div>

        {/* 추천 링크 */}
        <div className="mt-12 pt-8 border-t border-secondary-200">
          <p className="text-sm text-secondary-600 mb-4">다음 페이지를 방문해보세요:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/videos" className="text-primary-600 hover:text-primary-700 hover:underline font-medium">
              비디오 목록
            </Link>
            <Link to="/categories" className="text-primary-600 hover:text-primary-700 hover:underline font-medium">
              카테고리
            </Link>
            <Link to="/leaderboard" className="text-primary-600 hover:text-primary-700 hover:underline font-medium">
              리더보드
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
