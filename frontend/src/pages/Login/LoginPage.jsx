import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginAPI } from '../../services/authService';
import useAuthStore from '../../store/authStore';
import { useToast } from '../../contexts/ToastContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { showSuccess, showError } = useToast();
  
  // 폼 데이터
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // 에러 메시지
  const [errors, setErrors] = useState({});
  
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // 입력 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 입력 시 해당 필드 에러 제거
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // 유효성 검증
  const validate = () => {
    const newErrors = {};

    // 이메일 검증
    if (!formData.email) {
      newErrors.email = '이메일은 필수입니다';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = '비밀번호는 필수입니다';
    }

    return newErrors;
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검증
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // 로그인 API 호출
      const response = await loginAPI(formData);
      
      // Zustand 스토어에 로그인 정보 저장
      login(response.user, response.accessToken);

      // 폼 초기화
      setFormData({
        email: '',
        password: '',
      });

      // 토스트 알림
      showSuccess('로그인 성공!');

      // 저장된 리다이렉트 경로가 있으면 해당 경로로, 없으면 홈으로 이동
      const redirectPath = localStorage.getItem('redirectPath');
      if (redirectPath) {
        localStorage.removeItem('redirectPath');
        navigate(redirectPath);
      } else {
        navigate('/');
      }

    } catch (error) {
      console.error('로그인 실패:', error);
      
      // 토스트 에러 알림
      const errorMessage = error.message || '로그인 중 오류가 발생했습니다';
      showError(errorMessage);

      // 서버에서 온 에러 메시지 처리
      if (error.message) {
        setErrors({ general: error.message });
      } else if (error.errors) {
        setErrors(error.errors);
      } else {
        setErrors({ general: '로그인 중 오류가 발생했습니다. 다시 시도해주세요.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* 로고 및 타이틀 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-secondary-900 mb-2">
            LearnSnap
          </h1>
          <p className="text-secondary-600">
            전문 지식을 짧은 영상으로 학습하세요
          </p>
        </div>
        
        <Card padding="lg" shadow="medium">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">
            로그인
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 이메일 */}
            <Input
              label="이메일"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              error={errors.email}
              required
              disabled={isLoading}
            />
            
            {/* 비밀번호 */}
            <Input
              label="비밀번호"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.password}
              required
              disabled={isLoading}
            />
            
            {/* 제출 버튼 */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </form>
          
          {/* 회원가입 링크 */}
          <p className="mt-6 text-center text-sm text-secondary-600">
            계정이 없으신가요?{' '}
            <Link 
              to="/signup" 
              className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              회원가입
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
