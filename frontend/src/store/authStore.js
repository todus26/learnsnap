import { create } from 'zustand';

const useAuthStore = create((set) => ({
  // 상태
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  // 액션: 로그인
  login: (userData, accessToken) => {
    // localStorage에 저장
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(userData));

    // 상태 업데이트
    set({
      user: userData,
      token: accessToken,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  // 액션: 로그아웃
  logout: () => {
    // localStorage에서 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    // 상태 초기화
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  // 액션: 사용자 정보 업데이트
  updateUser: (userData) => {
    // localStorage 업데이트
    localStorage.setItem('user', JSON.stringify(userData));

    // 상태 업데이트
    set({ user: userData });
  },

  // 액션: 초기 인증 상태 확인
  checkAuth: () => {
    const token = localStorage.getItem('accessToken');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Failed to parse user data:', error);
        // 파싱 실패 시 로그아웃 처리
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } else {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));

export default useAuthStore;
