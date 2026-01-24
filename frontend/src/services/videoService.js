import api from './api';

// 전체 비디오 조회 (페이징)
export const getVideos = async (params = {}) => {
  try {
    const response = await api.get('/videos', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 특정 비디오 조회
export const getVideoById = async (id) => {
  try {
    const response = await api.get(`/videos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 비디오 검색
export const searchVideos = async (keyword, params = {}) => {
  try {
    const response = await api.get('/videos/search', {
      params: { q: keyword, ...params }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 카테고리별 비디오 조회
export const getVideosByCategory = async (categoryId, params = {}) => {
  try {
    const response = await api.get(`/videos/category/${categoryId}`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 강사별 비디오 조회
export const getVideosByInstructor = async (instructorId, params = {}) => {
  try {
    const response = await api.get(`/videos/instructor/${instructorId}`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 인기 비디오 조회
export const getPopularVideos = async (limit = 10) => {
  try {
    const response = await api.get('/videos/popular', {
      params: { limit }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 최신 비디오 조회
export const getRecentVideos = async (limit = 10) => {
  try {
    const response = await api.get('/videos/recent', {
      params: { limit }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 비디오 생성 (강사/관리자)
export const createVideo = async (videoData) => {
  try {
    const response = await api.post('/videos', videoData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 비디오 수정 (본인/관리자)
export const updateVideo = async (id, videoData) => {
  try {
    const response = await api.put(`/videos/${id}`, videoData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 비디오 삭제 (본인/관리자)
export const deleteVideo = async (id) => {
  try {
    const response = await api.delete(`/videos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// 조회수 증가
export const incrementViews = async (id) => {
  try {
    const response = await api.post(`/videos/${id}/view`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
