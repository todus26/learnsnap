import api from './api';

// API 에러 처리 헬퍼
const handleApiError = (error) => {
  // 네트워크 에러
  if (!error.response) {
    return {
      message: '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
      status: 0
    };
  }

  // 서버 에러
  const { status, data } = error.response;

  // 500번대 에러
  if (status >= 500) {
    return {
      message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      status,
      data
    };
  }

  // 401 - 인증 오류
  if (status === 401) {
    return {
      message: data?.message || '인증에 실패했습니다. 다시 로그인해주세요.',
      status,
      data
    };
  }

  // 403 - 권한 오류
  if (status === 403) {
    return {
      message: data?.message || '접근 권한이 없습니다.',
      status,
      data
    };
  }

  // 404 - 리소스 없음
  if (status === 404) {
    return {
      message: data?.message || '요청한 리소스를 찾을 수 없습니다.',
      status,
      data
    };
  }

  // 기타 클라이언트 에러 (4xx)
  return {
    message: data?.message || '요청 처리 중 오류가 발생했습니다.',
    status,
    data
  };
};

// 회원가입
export const signup = async (signupData) => {
  try {
    const response = await api.post('/auth/signup', signupData);
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error);
    throw apiError;
  }
};

// 로그인
export const login = async (loginData) => {
  try {
    const response = await api.post('/auth/login', loginData);
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error);
    throw apiError;
  }
};
