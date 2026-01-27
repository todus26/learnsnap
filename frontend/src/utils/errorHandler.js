// 전역 에러 핸들러
export const setupGlobalErrorHandlers = () => {
  // Unhandled Promise Rejection 핸들러
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
    
    // 프로덕션 환경에서는 에러 로깅 서비스로 전송
    // 예: Sentry.captureException(event.reason);
    
    // 사용자에게 에러 알림 (선택사항)
    // alert('예상치 못한 오류가 발생했습니다.');
  });

  // Global Error 핸들러
  window.addEventListener('error', (event) => {
    console.error('Global Error:', event.error);
    
    // 프로덕션 환경에서는 에러 로깅 서비스로 전송
    // 예: Sentry.captureException(event.error);
  });
};

// API 에러 분류
export const getErrorType = (error) => {
  if (!error.response) {
    return 'NETWORK_ERROR';
  }

  const status = error.response.status;

  if (status === 401) return 'UNAUTHORIZED';
  if (status === 403) return 'FORBIDDEN';
  if (status === 404) return 'NOT_FOUND';
  if (status >= 500) return 'SERVER_ERROR';
  if (status >= 400) return 'CLIENT_ERROR';

  return 'UNKNOWN_ERROR';
};

// 에러 메시지 가져오기
export const getErrorMessage = (error) => {
  if (!error.response) {
    return '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';
  }

  const { status, data } = error.response;

  // 서버에서 제공한 메시지 우선
  if (data?.message) {
    return data.message;
  }

  // 기본 메시지
  switch (status) {
    case 400:
      return '잘못된 요청입니다.';
    case 401:
      return '인증에 실패했습니다. 다시 로그인해주세요.';
    case 403:
      return '접근 권한이 없습니다.';
    case 404:
      return '요청한 리소스를 찾을 수 없습니다.';
    case 500:
      return '서버 오류가 발생했습니다.';
    case 503:
      return '서버가 일시적으로 사용할 수 없습니다.';
    default:
      return '오류가 발생했습니다.';
  }
};

// 에러 처리 유틸리티
export const handleError = (error, showToast = null) => {
  const errorType = getErrorType(error);
  const errorMessage = getErrorMessage(error);

  console.error('Error:', errorType, errorMessage);

  // 토스트 알림 표시 (제공된 경우)
  if (showToast) {
    showToast(errorMessage);
  }

  // 특정 에러 타입에 따른 추가 처리
  switch (errorType) {
    case 'UNAUTHORIZED':
      // 이미 api.js 인터셉터에서 처리됨
      break;
    case 'FORBIDDEN':
      // 권한 없음 페이지로 리다이렉트 (선택사항)
      // window.location.href = '/unauthorized';
      break;
    case 'SERVER_ERROR':
      // 서버 에러 페이지로 리다이렉트 (선택사항)
      // window.location.href = '/server-error';
      break;
    default:
      break;
  }

  return {
    type: errorType,
    message: errorMessage
  };
};
