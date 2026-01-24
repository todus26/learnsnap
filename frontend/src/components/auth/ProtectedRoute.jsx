import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
  }));

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 인증되지 않았을 때 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    // 현재 경로를 저장 (로그인 후 돌아오기 위해)
    localStorage.setItem('redirectPath', window.location.pathname);
    return <Navigate to="/login" replace />;
  }

  // 인증된 경우 children 렌더링
  return children;
};

export default ProtectedRoute;
