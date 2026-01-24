import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // 로그인 상태 확인
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };

    checkAuth();

    // storage 이벤트 리스너 추가 (다른 탭에서 로그인/로그아웃 시)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
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
            {user ? (
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
