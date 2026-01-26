import api from './api';

// 사용자의 전체 학습 진도 조회
export const getUserProgress = async () => {
  try {
    const response = await api.get('/user-progress');
    return response.data;
  } catch (error) {
    console.error('getUserProgress error:', error);
    throw error;
  }
};

// 특정 비디오의 학습 진도 조회
export const getVideoProgress = async (videoId) => {
  try {
    const response = await api.get(`/user-progress/video/${videoId}`);
    return response.data;
  } catch (error) {
    console.error('getVideoProgress error:', error);
    throw error;
  }
};

// 비디오 완료 표시
export const markVideoAsCompleted = async (videoId, quizScore = null) => {
  try {
    const response = await api.post(`/user-progress/video/${videoId}/complete`, {
      quizScore: quizScore
    });
    return response.data;
  } catch (error) {
    console.error('markVideoAsCompleted error:', error);
    throw error;
  }
};

// 비디오 시청 진도 업데이트
export const updateWatchProgress = async (videoId, watchedDuration) => {
  try {
    const response = await api.put(`/user-progress/video/${videoId}/progress`, {
      watchedDuration: watchedDuration
    });
    return response.data;
  } catch (error) {
    console.error('updateWatchProgress error:', error);
    throw error;
  }
};

// 완료한 비디오 목록
export const getCompletedVideos = async () => {
  try {
    const response = await api.get('/user-progress/completed');
    return response.data;
  } catch (error) {
    console.error('getCompletedVideos error:', error);
    // 404 에러면 빈 배열 반환
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

// 진행 중인 비디오 목록
export const getInProgressVideos = async () => {
  try {
    const response = await api.get('/user-progress/in-progress');
    return response.data;
  } catch (error) {
    console.error('getInProgressVideos error:', error);
    // 404 에러면 빈 배열 반환
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

// 학습 통계
export const getLearningStats = async () => {
  try {
    const response = await api.get('/user-progress/stats');
    return response.data;
  } catch (error) {
    console.error('getLearningStats error:', error);
    // 404 에러면 기본 통계 반환
    if (error.response?.status === 404) {
      return {
        completedVideos: 0,
        inProgressVideos: 0,
        totalWatchTime: 0,
        averageQuizScore: null
      };
    }
    throw error;
  }
};
