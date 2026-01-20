import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
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
          
          <div className="flex space-x-4">
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;