import React from 'react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">회원가입</h1>
        
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
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">사용자명</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="홍길동"
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
              가입하기
            </button>
          </form>
          
          <p className="mt-4 text-center text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;