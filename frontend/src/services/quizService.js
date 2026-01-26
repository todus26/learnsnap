import api from './api';

// 특정 비디오의 퀴즈 목록 조회
export const getQuizzesByVideoId = async (videoId) => {
  try {
    const response = await api.get(`/videos/${videoId}/quizzes`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 특정 퀴즈 조회
export const getQuizById = async (quizId) => {
  try {
    const response = await api.get(`/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 퀴즈 제출 및 채점
export const submitQuiz = async (quizId, answer) => {
  try {
    const response = await api.post(`/quizzes/${quizId}/submit`, {
      answer: answer
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 퀴즈 생성 (강사/관리자)
export const createQuiz = async (videoId, quizData) => {
  try {
    const response = await api.post(`/videos/${videoId}/quizzes`, quizData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 퀴즈 수정 (본인/관리자)
export const updateQuiz = async (quizId, quizData) => {
  try {
    const response = await api.put(`/quizzes/${quizId}`, quizData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 퀴즈 삭제 (본인/관리자)
export const deleteQuiz = async (quizId) => {
  try {
    const response = await api.delete(`/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
