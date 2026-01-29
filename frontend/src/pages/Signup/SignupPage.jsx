import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../services/authService';
import { useToast } from '../../contexts/ToastContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

const SignupPage = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  
  // 폼 데이터
  const [formData, setFormData] = useState({
    email: '',
    username: '',
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

    // 사용자명 검증
    if (!formData.username) {
      newErrors.username = '사용자명은 필수입니다';
    } else if (formData.username.length < 2) {
      newErrors.username = '사용자명은 최소 2자 이상이어야 합니다';
    } else if (formData.username.length > 50) {
      newErrors.username = '사용자명은 50자 이하여야 합니다';
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = '비밀번호는 필수입니다';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다';
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
      // 회원가입 API 호출
      await signup(formData);
      
      // 토스트 알림
      showSuccess('회원가입이 완료되었습니다!');
      
      // 폼 초기화
      setFormData({
        email: '',
        username: '',
        password: '',
      });

      // 로그인 페이지로 이동
      setTimeout(() => {
        navigate('/login');
      }, 1000);

    } catch (error) {
      console.error('회원가입 실패:', error);
      
      // 토스트 에러 알림
      const errorMessage = error.message || '회원가입 중 오류가 발생했습니다';
      showError(errorMessage);
      
      // 서버에서 온 에러 메시지 처리
      if (error.message) {
        if (error.message.includes('이메일')) {
          setErrors({ email: error.message });
        } else {
          setErrors({ general: error.message });
        }
      } else if (error.errors) {
        setErrors(error.errors);
      } else {
        setErrors({ general: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.' });
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
            지금 가입하고 학습을 시작하세요
          </p>
        </div>
        
        <Card padding="lg" shadow="medium">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">
            회원가입
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
            
            {/* 사용자명 */}
            <Input
              label="사용자명"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="홍길동"
              error={errors.username}
              required
              disabled={isLoading}
            />
            
            {/* 비밀번호 */}
            <div>
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
              <p className="mt-1.5 text-sm text-secondary-500">
                최소 6자 이상 입력해주세요
              </p>
            </div>
            
            {/* 제출 버튼 */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? '가입 중...' : '가입하기'}
            </Button>
          </form>
          
          {/* 로그인 링크 */}
          <p className="mt-6 text-center text-sm text-secondary-600">
            이미 계정이 있으신가요?{' '}
            <Link 
              to="/login" 
              className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              로그인
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
