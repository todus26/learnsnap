import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">로그인</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">이메일</label>
              <input 
                type="email" 
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="user@example.com"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">비밀번호</label>
              <input 
                type="password" 
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="••••••••"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              로그인
            </button>
          </form>
          
          <p className="mt-4 text-center text-gray-600">
            계정이 없으신가요?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;