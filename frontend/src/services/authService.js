import api from './api';

// 회원가입
export const signup = async (signupData) => {
  try {
    const response = await api.post('/auth/signup', signupData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 로그인
export const login = async (loginData) => {
  try {
    const response = await api.post('/auth/login', loginData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
