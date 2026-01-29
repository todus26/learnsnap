import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // 에러 발생 시 state 업데이트
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 로깅
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // 프로덕션 환경에서는 에러 로깅 서비스로 전송
    // 예: Sentry, LogRocket 등
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-secondary-50 px-4">
          <div className="max-w-lg w-full bg-white rounded-xl shadow-medium p-8">
            {/* 에러 아이콘 */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-error-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>

            {/* 에러 메시지 */}
            <h1 className="text-3xl font-bold text-center text-secondary-900 mb-4">
              오류가 발생했습니다
            </h1>
            <p className="text-center text-secondary-600 mb-6">
              예상치 못한 문제가 발생했습니다. 불편을 드려 죄송합니다.
            </p>

            {/* 에러 상세 정보 (개발 환경에서만) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 bg-secondary-50 p-4 rounded-lg border border-secondary-200">
                <summary className="cursor-pointer font-semibold text-secondary-700 mb-2">
                  에러 상세 정보 (개발 환경에서만 표시)
                </summary>
                <div className="mt-2">
                  <p className="text-sm text-error-600 font-mono mb-2">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <pre className="text-xs text-secondary-600 overflow-auto max-h-40 bg-white p-2 rounded border">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            {/* 액션 버튼 */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 font-semibold transition-colors"
              >
                다시 시도
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-secondary-100 text-secondary-700 px-6 py-3 rounded-lg hover:bg-secondary-200 font-semibold transition-colors"
              >
                홈으로 이동
              </button>
            </div>

            {/* 지원 정보 */}
            <p className="text-center text-sm text-secondary-500 mt-6">
              문제가 계속되면 고객 지원팀에 문의해주세요.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
