import api from './api';

// 스트릭 정보 조회
export const getStreak = async () => {
  try {
    const response = await api.get('/gamification/streak');
    return response.data;
  } catch (error) {
    console.error('getStreak error:', error);
    // 404 에러면 기본값 반환
    if (error.response?.status === 404) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: null
      };
    }
    throw error;
  }
};

// 포인트 정보 조회
export const getPoints = async () => {
  try {
    const response = await api.get('/gamification/points');
    return response.data;
  } catch (error) {
    console.error('getPoints error:', error);
    // 404 에러면 기본값 반환
    if (error.response?.status === 404) {
      return {
        totalPoints: 0,
        level: 1
      };
    }
    throw error;
  }
};

// 뱃지 목록 조회
export const getBadges = async () => {
  try {
    const response = await api.get('/gamification/badges');
    return response.data;
  } catch (error) {
    console.error('getBadges error:', error);
    // 404 에러면 빈 배열 반환
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

// 사용자가 획득한 뱃지 목록
export const getUserBadges = async () => {
  try {
    const response = await api.get('/gamification/user-badges');
    return response.data;
  } catch (error) {
    console.error('getUserBadges error:', error);
    // 404 에러면 빈 배열 반환
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

// 리더보드 조회
export const getLeaderboard = async (period = 'WEEKLY') => {
  try {
    const response = await api.get(`/gamification/leaderboard?period=${period}`);
    return response.data;
  } catch (error) {
    console.error('getLeaderboard error:', error);
    // 404 에러면 빈 배열 반환
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

// 포인트 적립 (시스템에서 자동 호출)
export const addPoints = async (points, reason) => {
  try {
    const response = await api.post('/gamification/points/add', {
      points,
      reason
    });
    return response.data;
  } catch (error) {
    console.error('addPoints error:', error);
    throw error;
  }
};
