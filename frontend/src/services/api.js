import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10초 타임아웃
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
    console.error('API Request Error:', error);
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
    // 네트워크 에러 (서버 응답 없음)
    if (!error.response) {
      console.error('Network Error:', error.message);
      
      // 타임아웃 에러
      if (error.code === 'ECONNABORTED') {
        console.error('Request timeout');
      }
      
      return Promise.reject(error);
    }

    // 에러 응답 처리
    const { status, data } = error.response;

    // 401 Unauthorized: 토큰 만료 또는 인증 실패
    if (status === 401) {
      console.error('Unauthorized: 인증 실패');
      
      // 토큰 제거
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      
      // 로그인 페이지가 아닌 경우에만 리다이렉트
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/signup') {
        // 현재 페이지 경로 저장 (로그인 후 돌아가기 위해)
        localStorage.setItem('redirectPath', currentPath);
        
        // 로그인 페이지로 리다이렉트
        window.location.href = '/login';
      }
    }

    // 403 Forbidden: 권한 없음
    if (status === 403) {
      console.error('Forbidden: 접근 권한이 없습니다');
      
      // 권한 없음 페이지로 리다이렉트 (필요시)
      // window.location.href = '/unauthorized';
    }

    // 404 Not Found
    if (status === 404) {
      console.error('Not Found:', data?.message || '리소스를 찾을 수 없습니다');
    }

    // 500 Internal Server Error
    if (status >= 500) {
      console.error('Server Error:', status, data?.message || '서버 오류');
      
      // 서버 에러 페이지로 리다이렉트 (필요시)
      // window.location.href = '/server-error';
    }

    // 에러 로깅 (프로덕션에서는 Sentry 등의 서비스 사용)
    console.error('API Error:', {
      status,
      url: error.config?.url,
      method: error.config?.method,
      data: data
    });

    return Promise.reject(error);
  }
);

export default api;
