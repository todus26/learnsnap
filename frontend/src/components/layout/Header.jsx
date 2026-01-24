import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-blue-600"
            onClick={handleLinkClick}
          >
            LearnSnap
          </Link>
          
          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/videos" 
              className={`transition-colors ${
                isActive('/videos') 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              비디오
            </Link>
            <Link 
              to="/categories" 
              className={`transition-colors ${
                isActive('/categories') 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              카테고리
            </Link>
          </nav>
          
          {/* 데스크톱 인증 버튼 */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                <Link 
                  to="/profile" 
                  className={`transition-colors ${
                    isActive('/profile') 
                      ? 'text-blue-600 font-semibold' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {user.username}님
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  로그인
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>

          {/* 모바일 햄버거 메뉴 버튼 */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600"
            aria-label="메뉴"
          >
            <svg 
              className="w-6 h-6" 
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
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/videos" 
                onClick={handleLinkClick}
                className={`px-2 py-2 rounded transition-colors ${
                  isActive('/videos') 
                    ? 'text-blue-600 font-semibold bg-blue-50' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                비디오
              </Link>
              <Link 
                to="/categories" 
                onClick={handleLinkClick}
                className={`px-2 py-2 rounded transition-colors ${
                  isActive('/categories') 
                    ? 'text-blue-600 font-semibold bg-blue-50' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                카테고리
              </Link>
              
              {/* 모바일 인증 버튼 */}
              <div className="border-t pt-3 mt-3">
                {isAuthenticated && user ? (
                  <>
                    <Link 
                      to="/profile" 
                      onClick={handleLinkClick}
                      className={`block px-2 py-2 rounded transition-colors ${
                        isActive('/profile') 
                          ? 'text-blue-600 font-semibold bg-blue-50' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {user.username}님 프로필
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      onClick={handleLinkClick}
                      className="block px-2 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                    >
                      로그인
                    </Link>
                    <Link 
                      to="/signup" 
                      onClick={handleLinkClick}
                      className="block mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-center transition-colors"
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
