import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const Header = () => {
  const navigate = useNavigate();
  
  // 상태만 가져오기 (함수는 제외)
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // 로그아웃 핸들러
  const handleLogout = () => {
    // getState()로 직접 함수 호출
    useAuthStore.getState().logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            LearnSnap
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/videos" className="text-gray-700 hover:text-blue-600">
              비디오
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-blue-600">
              카테고리
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              // 로그인 상태
              <>
                <Link 
                  to="/profile" 
                  className="text-gray-700 hover:text-blue-600"
                >
                  {user.username}님
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  로그아웃
                </button>
              </>
            ) : (
              // 비로그인 상태
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600"
                >
                  로그인
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
