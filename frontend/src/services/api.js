import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request 인터셉터: JWT 토큰 자동 첨부
api.interceptors.request.use(
  (config) => {
    // localStorage에서 토큰 가져오기
    const token = localStorage.getItem('accessToken');
    
    // 토큰이 있으면 Authorization 헤더에 추가
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  }
);

// Response 인터셉터: 에러 처리 및 토큰 만료 처리
api.interceptors.response.use(
  (response) => {
    // 성공 응답은 그대로 반환
    return response;
  },
  (error) => {
    // 에러 응답 처리
    if (error.response) {
      const { status } = error.response;

      // 401 Unauthorized: 토큰 만료 또는 인증 실패
      if (status === 401) {
        // 토큰 제거
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        
        // 로그인 페이지가 아닌 경우에만 리다이렉트
        if (window.location.pathname !== '/login') {
          // 현재 페이지 경로 저장 (로그인 후 돌아가기 위해)
          localStorage.setItem('redirectPath', window.location.pathname);
          
          // 로그인 페이지로 리다이렉트
          window.location.href = '/login';
        }
      }

      // 403 Forbidden: 권한 없음
      if (status === 403) {
        console.error('접근 권한이 없습니다.');
        // 필요시 alert나 toast 메시지 표시
      }

      // 500 Internal Server Error
      if (status === 500) {
        console.error('서버 오류가 발생했습니다.');
      }
    }

    return Promise.reject(error);
  }
);

export default api;
