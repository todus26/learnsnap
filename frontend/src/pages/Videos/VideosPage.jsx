import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getVideos, searchVideos, getVideosByCategory } from '../../services/videoService';
import { getCategories } from '../../services/categoryService';
import VideoCard from '../../components/video/VideoCard';
import Pagination from '../../components/common/Pagination';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';

const VideosPage = () => {
  // URL 쿼리 파라미터
  const [searchParams, setSearchParams] = useSearchParams();

  // 상태 관리
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 페이징 상태
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 9;

  // 필터 상태
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedDifficulty, setSelectedDifficulty] = useState(searchParams.get('difficulty') || '');

  // 난이도 옵션
  const difficultyOptions = [
    { value: 'BEGINNER', label: '초급' },
    { value: 'INTERMEDIATE', label: '중급' },
    { value: 'ADVANCED', label: '고급' }
  ];

  // 카테고리 목록 불러오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.map(cat => ({
          value: cat.id.toString(),
          label: cat.name
        })));
      } catch (err) {
        console.error('카테고리 불러오기 실패:', err);
      }
    };
    fetchCategories();
  }, []);

  // 비디오 목록 불러오기
  const fetchVideos = async (page = 0) => {
    setLoading(true);
    setError(null);

    try {
      let response;

      // 검색어가 있는 경우
      if (searchKeyword) {
        response = await searchVideos(searchKeyword, {
          page: page,
          size: pageSize,
          ...(selectedDifficulty && { difficulty: selectedDifficulty })
        });
      }
      // 카테고리 필터가 있는 경우
      else if (selectedCategory) {
        response = await getVideosByCategory(selectedCategory, {
          page: page,
          size: pageSize,
          ...(selectedDifficulty && { difficulty: selectedDifficulty })
        });
      }
      // 전체 목록
      else {
        response = await getVideos({
          page: page,
          size: pageSize,
          ...(selectedDifficulty && { difficulty: selectedDifficulty })
        });
      }

      // response 형식 처리
      if (Array.isArray(response)) {
        setVideos(response);
        setCurrentPage(0);
        setTotalPages(1);
        setTotalElements(response.length);
      } else if (response.content) {
        setVideos(response.content);
        setCurrentPage(response.number || response.page || 0);
        setTotalPages(response.totalPages || 1);
        setTotalElements(response.totalElements || 0);
      } else {
        console.error('예상치 못한 응답 형식:', response);
        setError('데이터 형식이 올바르지 않습니다.');
      }
    } catch (err) {
      console.error('비디오 목록 불러오기 실패:', err);
      setError('비디오 목록을 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 필터/검색 변경 시 비디오 다시 불러오기
  useEffect(() => {
    setCurrentPage(0);
    fetchVideos(0);

    // URL 쿼리 파라미터 업데이트
    const params = {};
    if (searchKeyword) params.q = searchKeyword;
    if (selectedCategory) params.category = selectedCategory;
    if (selectedDifficulty) params.difficulty = selectedDifficulty;
    setSearchParams(params);
  }, [searchKeyword, selectedCategory, selectedDifficulty]);

  // 페이지 변경 시
  useEffect(() => {
    if (currentPage > 0) {
      fetchVideos(currentPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  // 검색 핸들러
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setCurrentPage(0);
  };

  // 카테고리 필터 핸들러
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(0);
  };

  // 난이도 필터 핸들러
  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setCurrentPage(0);
  };

  // 필터 초기화
  const handleResetFilters = () => {
    setSearchKeyword('');
    setSelectedCategory('');
    setSelectedDifficulty('');
    setCurrentPage(0);
    setSearchParams({});
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 로딩 중
  if (loading && currentPage === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">모든 비디오</h1>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">비디오를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">모든 비디오</h1>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={() => fetchVideos(currentPage)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <h1 className="text-3xl font-bold mb-6">모든 비디오</h1>

      {/* 검색 및 필터 영역 */}
      <div className="mb-6 space-y-4">
        {/* 검색바 */}
        <SearchBar onSearch={handleSearch} />

        {/* 필터 */}
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <FilterDropdown
              label="카테고리"
              value={selectedCategory}
              onChange={handleCategoryChange}
              options={categories}
            />
          </div>

          <div className="flex-1">
            <FilterDropdown
              label="난이도"
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
              options={difficultyOptions}
            />
          </div>

          {/* 필터 초기화 버튼 */}
          {(searchKeyword || selectedCategory || selectedDifficulty) && (
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              필터 초기화
            </button>
          )}
        </div>

        {/* 활성 필터 표시 */}
        {(searchKeyword || selectedCategory || selectedDifficulty) && (
          <div className="flex flex-wrap gap-2">
            {searchKeyword && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                검색: {searchKeyword}
              </span>
            )}
            {selectedCategory && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                카테고리: {categories.find(c => c.value === selectedCategory)?.label}
              </span>
            )}
            {selectedDifficulty && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                난이도: {difficultyOptions.find(d => d.value === selectedDifficulty)?.label}
              </span>
            )}
          </div>
        )}
      </div>

      {/* 결과 카운트 */}
      <div className="mb-4">
        <p className="text-gray-600">
          {searchKeyword || selectedCategory || selectedDifficulty
            ? `검색 결과: ${totalElements.toLocaleString()}개`
            : `전체: ${totalElements.toLocaleString()}개`}
        </p>
      </div>

      {/* 비디오 없음 */}
      {videos.length === 0 ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">
              {searchKeyword || selectedCategory || selectedDifficulty
                ? '검색 결과가 없습니다.'
                : '아직 등록된 비디오가 없습니다.'}
            </p>
            {(searchKeyword || selectedCategory || selectedDifficulty) && (
              <button
                onClick={handleResetFilters}
                className="text-blue-500 hover:underline"
              >
                모든 비디오 보기
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* 비디오 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default VideosPage;
