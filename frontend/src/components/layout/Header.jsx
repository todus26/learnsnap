import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import Button from '../common/Button';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 상태만 가져오기
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // 로그아웃 핸들러
  const handleLogout = () => {
    useAuthStore.getState().logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  // 모바일 메뉴 토글
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 현재 경로 확인 함수
  const isActive = (path) => {
    return location.pathname === path;
  };

  // 링크 클릭 시 모바일 메뉴 닫기
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-secondary-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
            onClick={handleLinkClick}
          >
            LearnSnap
          </Link>
          
          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/videos" 
              className={`font-medium transition-colors ${
                isActive('/videos') 
                  ? 'text-primary-600' 
                  : 'text-secondary-700 hover:text-primary-600'
              }`}
            >
              비디오
            </Link>
            <Link 
              to="/categories" 
              className={`font-medium transition-colors ${
                isActive('/categories') 
                  ? 'text-primary-600' 
                  : 'text-secondary-700 hover:text-primary-600'
              }`}
            >
              카테고리
            </Link>
            <Link 
              to="/leaderboard" 
              className={`font-medium transition-colors ${
                isActive('/leaderboard') 
                  ? 'text-primary-600' 
                  : 'text-secondary-700 hover:text-primary-600'
              }`}
            >
              리더보드
            </Link>
          </nav>
          
          {/* 데스크톱 인증 버튼 */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated && user ? (
              <>
                {/* 강사/관리자 전용 메뉴 */}
                {(user.role === 'INSTRUCTOR' || user.role === 'ADMIN') && (
                  <>
                    <Link to="/instructor/dashboard">
                      <Button variant="ghost" size="sm">
                        대시보드
                      </Button>
                    </Link>
                    <Link to="/instructor/upload">
                      <Button variant="ghost" size="sm">
                        업로드
                      </Button>
                    </Link>
                  </>
                )}
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    프로필
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    로그인
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    회원가입
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          {/* 모바일 햄버거 메뉴 버튼 */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="메뉴"
          >
            <svg 
              className="w-6 h-6 text-secondary-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>
        
        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-secondary-200">
            <nav className="flex flex-col space-y-1">
              <Link 
                to="/videos" 
                onClick={handleLinkClick}
                className={`px-3 py-2.5 rounded-lg font-medium transition-colors ${
                  isActive('/videos') 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-secondary-700 hover:bg-secondary-50'
                }`}
              >
                비디오
              </Link>
              <Link 
                to="/categories" 
                onClick={handleLinkClick}
                className={`px-3 py-2.5 rounded-lg font-medium transition-colors ${
                  isActive('/categories') 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-secondary-700 hover:bg-secondary-50'
                }`}
              >
                카테고리
              </Link>
              <Link 
                to="/leaderboard" 
                onClick={handleLinkClick}
                className={`px-3 py-2.5 rounded-lg font-medium transition-colors ${
                  isActive('/leaderboard') 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-secondary-700 hover:bg-secondary-50'
                }`}
              >
                리더보드
              </Link>
              
              {/* 모바일 인증 버튼 */}
              <div className="border-t border-secondary-200 pt-3 mt-3 space-y-1">
                {isAuthenticated && user ? (
                  <>
                    {/* 강사/관리자 전용 메뉴 */}
                    {(user.role === 'INSTRUCTOR' || user.role === 'ADMIN') && (
                      <>
                        <Link 
                          to="/instructor/dashboard" 
                          onClick={handleLinkClick}
                          className={`block px-3 py-2.5 rounded-lg font-medium transition-colors ${
                            isActive('/instructor/dashboard') 
                              ? 'text-primary-600 bg-primary-50' 
                              : 'text-secondary-700 hover:bg-secondary-50'
                          }`}
                        >
                          강사 대시보드
                        </Link>
                        <Link 
                          to="/instructor/upload" 
                          onClick={handleLinkClick}
                          className={`block px-3 py-2.5 rounded-lg font-medium transition-colors ${
                            isActive('/instructor/upload') 
                              ? 'text-primary-600 bg-primary-50' 
                              : 'text-secondary-700 hover:bg-secondary-50'
                          }`}
                        >
                          비디오 업로드
                        </Link>
                      </>
                    )}
                    <Link 
                      to="/profile" 
                      onClick={handleLinkClick}
                      className={`block px-3 py-2.5 rounded-lg font-medium transition-colors ${
                        isActive('/profile') 
                          ? 'text-primary-600 bg-primary-50' 
                          : 'text-secondary-700 hover:bg-secondary-50'
                      }`}
                    >
                      프로필
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2.5 rounded-lg font-medium text-error-600 hover:bg-error-50 transition-colors"
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      onClick={handleLinkClick}
                      className="block px-3 py-2.5 rounded-lg font-medium text-secondary-700 hover:bg-secondary-50 transition-colors"
                    >
                      로그인
                    </Link>
                    <Link 
                      to="/signup" 
                      onClick={handleLinkClick}
                      className="block px-3 py-2.5 rounded-lg font-medium text-primary-600 hover:bg-primary-50 transition-colors"
                    >
                      회원가입
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
