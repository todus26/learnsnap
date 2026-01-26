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
import LeaderboardPage from './pages/Leaderboard/LeaderboardPage';
import InstructorPage from './pages/Instructor/InstructorPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';

function App() {
  // 앱 시작 시 인증 상태 확인 (dependency 배열 비워서 한 번만 실행)
  useEffect(() => {
    useAuthStore.getState().checkAuth();
  }, []); // 빈 배열로 수정!

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
          <Route path="leaderboard" element={<LeaderboardPage />} />
          
          {/* 보호된 라우트 (로그인 필요) */}
          <Route 
            path="profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          
          {/* 강사 전용 라우트 */}
          <Route 
            path="instructor/upload" 
            element={
              <ProtectedRoute>
                <InstructorPage />
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
