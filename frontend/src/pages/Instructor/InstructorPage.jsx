import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { getCategories } from '../../services/categoryService';
import { uploadVideo } from '../../services/videoService';
import { useToast } from '../../contexts/ToastContext';

const InstructorPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { showSuccess, showError } = useToast();

  // 폼 상태
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    difficultyLevel: 'BEGINNER',
    videoFile: null,
    thumbnailFile: null
  });

  // 기타 상태
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // 권한 체크
  useEffect(() => {
    if (user && user.role !== 'INSTRUCTOR' && user.role !== 'ADMIN') {
      alert('강사 권한이 필요합니다.');
      navigate('/');
    }
  }, [user, navigate]);

  // 카테고리 불러오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('카테고리 불러오기 실패:', err);
      }
    };

    fetchCategories();
  }, []);

  // 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // 비디오 파일 선택
  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 파일 크기 제한 (500MB)
      if (file.size > 500 * 1024 * 1024) {
        alert('비디오 파일은 500MB 이하로 업로드해주세요.');
        return;
      }

      // 파일 형식 체크
      if (!file.type.startsWith('video/')) {
        alert('비디오 파일만 업로드 가능합니다.');
        return;
      }

      setFormData((prev) => ({
        ...prev,
        videoFile: file
      }));
    }
  };

  // 썸네일 파일 선택
  const handleThumbnailFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 파일 크기 제한 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('썸네일 이미지는 5MB 이하로 업로드해주세요.');
        return;
      }

      // 파일 형식 체크
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      setFormData((prev) => ({
        ...prev,
        thumbnailFile: file
      }));

      // 썸네일 미리보기
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 폼 유효성 검사
  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('제목을 입력해주세요.');
      return false;
    }

    if (!formData.description.trim()) {
      setError('설명을 입력해주세요.');
      return false;
    }

    if (!formData.categoryId) {
      setError('카테고리를 선택해주세요.');
      return false;
    }

    if (!formData.videoFile) {
      setError('비디오 파일을 선택해주세요.');
      return false;
    }

    return true;
  };

  // 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // FormData 생성
      const uploadData = new FormData();
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);
      uploadData.append('categoryId', formData.categoryId);
      uploadData.append('difficultyLevel', formData.difficultyLevel);
      uploadData.append('videoFile', formData.videoFile);
      
      if (formData.thumbnailFile) {
        uploadData.append('thumbnailFile', formData.thumbnailFile);
      }

      // 업로드 진행률 시뮬레이션 (실제로는 axios onUploadProgress 사용)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      // 비디오 업로드
      const response = await uploadVideo(uploadData);

      clearInterval(progressInterval);
      setUploadProgress(100);

      // 성공 알림
      showSuccess('비디오가 성공적으로 업로드되었습니다!');

      // 업로드된 비디오 페이지로 이동
      if (response.id) {
        navigate(`/videos/${response.id}`);
      } else {
        navigate('/videos');
      }
    } catch (err) {
      console.error('업로드 실패:', err);
      const errorMessage = err.response?.data?.message || '비디오 업로드에 실패했습니다.';
      showError(errorMessage);
      setError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  // 폼 리셋
  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      categoryId: '',
      difficultyLevel: 'BEGINNER',
      videoFile: null,
      thumbnailFile: null
    });
    setPreviewUrl(null);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">📹 비디오 업로드</h1>
        <p className="text-gray-600">
          새로운 강의 비디오를 업로드하고 학습자들과 공유하세요.
        </p>
      </div>

      {/* 업로드 폼 */}
      <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          {/* 제목 */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="강의 제목을 입력하세요"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={uploading}
              maxLength={100}
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.title.length} / 100
            </p>
          </div>

          {/* 설명 */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              설명 <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="강의 내용을 설명해주세요"
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={uploading}
              maxLength={1000}
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.description.length} / 1000
            </p>
          </div>

          {/* 카테고리 & 난이도 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* 카테고리 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                카테고리 <span className="text-red-500">*</span>
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={uploading}
              >
                <option value="">카테고리 선택</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 난이도 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                난이도 <span className="text-red-500">*</span>
              </label>
              <select
                name="difficultyLevel"
                value={formData.difficultyLevel}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={uploading}
              >
                <option value="BEGINNER">초급</option>
                <option value="INTERMEDIATE">중급</option>
                <option value="ADVANCED">고급</option>
              </select>
            </div>
          </div>

          {/* 비디오 파일 */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              비디오 파일 <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoFileChange}
                className="hidden"
                id="video-file-input"
                disabled={uploading}
              />
              <label
                htmlFor="video-file-input"
                className="cursor-pointer inline-block"
              >
                {formData.videoFile ? (
                  <div>
                    <span className="text-2xl mb-2 block">🎬</span>
                    <p className="text-blue-600 font-semibold">
                      {formData.videoFile.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(formData.videoFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      클릭하여 다른 파일 선택
                    </p>
                  </div>
                ) : (
                  <div>
                    <span className="text-5xl mb-2 block">📁</span>
                    <p className="text-gray-700 font-semibold mb-1">
                      비디오 파일을 선택하세요
                    </p>
                    <p className="text-sm text-gray-500">
                      MP4, AVI, MOV 등 (최대 500MB)
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* 썸네일 파일 */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              썸네일 이미지 (선택)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailFileChange}
                className="hidden"
                id="thumbnail-file-input"
                disabled={uploading}
              />
              <label
                htmlFor="thumbnail-file-input"
                className="cursor-pointer inline-block"
              >
                {previewUrl ? (
                  <div>
                    <img
                      src={previewUrl}
                      alt="썸네일 미리보기"
                      className="max-w-xs max-h-48 mx-auto mb-2 rounded"
                    />
                    <p className="text-blue-600 font-semibold">
                      {formData.thumbnailFile?.name}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      클릭하여 다른 이미지 선택
                    </p>
                  </div>
                ) : (
                  <div>
                    <span className="text-5xl mb-2 block">🖼️</span>
                    <p className="text-gray-700 font-semibold mb-1">
                      썸네일 이미지를 선택하세요
                    </p>
                    <p className="text-sm text-gray-500">
                      JPG, PNG (최대 5MB)
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
              {error}
            </div>
          )}

          {/* 업로드 진행률 */}
          {uploading && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  업로드 중...
                </span>
                <span className="text-sm font-semibold text-blue-600">
                  {uploadProgress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* 버튼 */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={uploading}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                uploading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {uploading ? '업로드 중...' : '업로드'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={uploading}
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              초기화
            </button>
          </div>
        </form>
      </div>

      {/* 안내 사항 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8 max-w-3xl mx-auto">
        <h3 className="font-semibold text-blue-900 mb-2">📌 업로드 가이드</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 비디오 파일은 500MB 이하로 업로드해주세요.</li>
          <li>• 썸네일 이미지는 16:9 비율을 권장합니다.</li>
          <li>• 업로드 후 관리자의 승인이 필요할 수 있습니다.</li>
          <li>• 저작권이 있는 콘텐츠는 업로드하지 마세요.</li>
        </ul>
      </div>
    </div>
  );
};

export default InstructorPage;
