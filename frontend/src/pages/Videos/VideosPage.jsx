import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getVideos, searchVideos, getVideosByCategory } from '../../services/videoService';
import { getCategories } from '../../services/categoryService';
import VideoCard from '../../components/video/VideoCard';
import { VideoCardSkeletonList } from '../../components/common/VideoCardSkeleton';
import Pagination from '../../components/common/Pagination';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const VideosPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 9;

  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedDifficulty, setSelectedDifficulty] = useState(searchParams.get('difficulty') || '');

  const difficultyOptions = [
    { value: 'BEGINNER', label: '초급' },
    { value: 'INTERMEDIATE', label: '중급' },
    { value: 'ADVANCED', label: '고급' }
  ];

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

  const fetchVideos = async (page = 0) => {
    setLoading(true);
    setError(null);

    try {
      let response;

      if (searchKeyword) {
        response = await searchVideos(searchKeyword, {
          page: page,
          size: pageSize,
          ...(selectedDifficulty && { difficulty: selectedDifficulty })
        });
      } else if (selectedCategory) {
        response = await getVideosByCategory(selectedCategory, {
          page: page,
          size: pageSize,
          ...(selectedDifficulty && { difficulty: selectedDifficulty })
        });
      } else {
        response = await getVideos({
          page: page,
          size: pageSize,
          ...(selectedDifficulty && { difficulty: selectedDifficulty })
        });
      }

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

  useEffect(() => {
    setCurrentPage(0);
    fetchVideos(0);

    const params = {};
    if (searchKeyword) params.q = searchKeyword;
    if (selectedCategory) params.category = selectedCategory;
    if (selectedDifficulty) params.difficulty = selectedDifficulty;
    setSearchParams(params);
  }, [searchKeyword, selectedCategory, selectedDifficulty]);

  useEffect(() => {
    if (currentPage > 0) {
      fetchVideos(currentPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setCurrentPage(0);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(0);
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setCurrentPage(0);
  };

  const handleResetFilters = () => {
    setSearchKeyword('');
    setSelectedCategory('');
    setSelectedDifficulty('');
    setCurrentPage(0);
    setSearchParams({});
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading && currentPage === 0) {
    return (
      <div className="bg-secondary-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-6">모든 비디오</h1>
          <div className="flex items-center justify-center min-h-[400px]">
            <LoadingSpinner size="large" text="비디오를 불러오는 중..." />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-secondary-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-6">모든 비디오</h1>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-error-600 text-lg mb-4">{error}</p>
              <Button variant="primary" onClick={() => fetchVideos(currentPage)}>
                다시 시도
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-secondary-900 mb-6">모든 비디오</h1>

        <div className="mb-6 space-y-4">
          <SearchBar onSearch={handleSearch} />

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

            {(searchKeyword || selectedCategory || selectedDifficulty) && (
              <Button variant="outline" onClick={handleResetFilters}>
                필터 초기화
              </Button>
            )}
          </div>

          {(searchKeyword || selectedCategory || selectedDifficulty) && (
            <div className="flex flex-wrap gap-2">
              {searchKeyword && (
                <Badge variant="primary">
                  검색: {searchKeyword}
                </Badge>
              )}
              {selectedCategory && (
                <Badge variant="success">
                  카테고리: {categories.find(c => c.value === selectedCategory)?.label}
                </Badge>
              )}
              {selectedDifficulty && (
                <Badge variant="default">
                  난이도: {difficultyOptions.find(d => d.value === selectedDifficulty)?.label}
                </Badge>
              )}
            </div>
          )}
        </div>

        {loading && <VideoCardSkeletonList count={9} />}

        {!loading && (
          <div className="mb-4">
            <p className="text-secondary-600">
              {searchKeyword || selectedCategory || selectedDifficulty
                ? `검색 결과: ${totalElements.toLocaleString()}개`
                : `전체: ${totalElements.toLocaleString()}개`}
            </p>
          </div>
        )}

        {!loading && videos.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-secondary-600 text-lg mb-4">
                {searchKeyword || selectedCategory || selectedDifficulty
                  ? '검색 결과가 없습니다.'
                  : '아직 등록된 비디오가 없습니다.'}
              </p>
              {(searchKeyword || selectedCategory || selectedDifficulty) && (
                <Button variant="ghost" onClick={handleResetFilters}>
                  모든 비디오 보기
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>

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
    </div>
  );
};

export default VideosPage;
