import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useAuthStore from './store/authStore';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import VideosPage from './pages/Videos/VideosPage';
import VideoDetailPage from './pages/VideoDetail/VideoDetailPage';
import ProfilePage from './pages/Profile/ProfilePage';
import CategoriesPage from './pages/Categories/CategoriesPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  // 앱 시작 시 인증 상태 확인
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="videos" element={<VideosPage />} />
          <Route path="videos/:id" element={<VideoDetailPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          
          {/* 보호된 라우트 (로그인 필요) */}
          <Route 
            path="profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
