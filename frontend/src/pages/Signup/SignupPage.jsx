import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../services/authService';

const SignupPage = () => {
  const navigate = useNavigate();
  
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
  
  // 성공 메시지
  const [successMessage, setSuccessMessage] = useState('');

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
    setSuccessMessage('');

    try {
      // 회원가입 API 호출
      const response = await signup(formData);
      
      // 성공 메시지 표시
      setSuccessMessage('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다...');
      
      // 폼 초기화
      setFormData({
        email: '',
        username: '',
        password: '',
      });

      // 2초 후 로그인 페이지로 이동
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error('회원가입 실패:', error);
      
      // 서버에서 온 에러 메시지 처리
      if (error.message) {
        // 이메일 중복 에러
        if (error.message.includes('이메일')) {
          setErrors({ email: error.message });
        } else {
          setErrors({ general: error.message });
        }
      } else if (error.errors) {
        // 유효성 검증 에러 (백엔드)
        setErrors(error.errors);
      } else {
        setErrors({ general: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">회원가입</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          {/* 성공 메시지 */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {successMessage}
            </div>
          )}

          {/* 일반 에러 메시지 */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* 이메일 */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                이메일 <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="user@example.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            
            {/* 사용자명 */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                사용자명 <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="홍길동"
                disabled={isLoading}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
              )}
            </div>
            
            {/* 비밀번호 */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                비밀번호 <span className="text-red-500">*</span>
              </label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                최소 6자 이상 입력해주세요
              </p>
            </div>
            
            {/* 제출 버튼 */}
            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 rounded-lg text-white font-semibold ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isLoading ? '가입 중...' : '가입하기'}
            </button>
          </form>
          
          {/* 로그인 링크 */}
          <p className="mt-4 text-center text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
