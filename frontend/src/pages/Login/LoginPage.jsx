import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  
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
      const response = await login(formData);
      
      // JWT 토큰을 localStorage에 저장
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('user', JSON.stringify(response.user));

      // 폼 초기화
      setFormData({
        email: '',
        password: '',
      });

      // 홈 페이지로 이동
      navigate('/');

    } catch (error) {
      console.error('로그인 실패:', error);
      
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">로그인</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
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
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </form>
          
          {/* 회원가입 링크 */}
          <p className="mt-4 text-center text-gray-600">
            계정이 없으신가요?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
