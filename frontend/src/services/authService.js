import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

// 회원가입
export const signup = async (signupData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, signupData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 로그인
export const login = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
