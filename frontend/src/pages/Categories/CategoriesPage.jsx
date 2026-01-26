import React, { useState, useEffect } from 'react';
import { getCategories } from '../../services/categoryService';
import CategoryCard from '../../components/category/CategoryCard';

const CategoriesPage = () => {
  // 상태 관리
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 카테고리 목록 불러오기
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCategories();
      
      // 카테고리 정렬 (이름순 또는 ID순)
      const sortedCategories = data.sort((a, b) => {
        // videoCount가 있으면 비디오 개수 많은 순
        if (a.videoCount !== undefined && b.videoCount !== undefined) {
          return b.videoCount - a.videoCount;
        }
        // 없으면 이름순
        return a.name.localeCompare(b.name);
      });

      setCategories(sortedCategories);
    } catch (err) {
      console.error('카테고리 목록 불러오기 실패:', err);
      setError('카테고리 목록을 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 카테고리 불러오기
  useEffect(() => {
    fetchCategories();
  }, []);

  // 로딩 중
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">카테고리</h1>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">카테고리를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">카테고리</h1>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={fetchCategories}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 카테고리 없음
  if (categories.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">카테고리</h1>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-gray-600 text-lg">아직 등록된 카테고리가 없습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">카테고리</h1>
        <p className="text-gray-600">
          관심있는 분야의 강의를 찾아보세요 ({categories.length}개의 카테고리)
        </p>
      </div>

      {/* 카테고리 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {/* 하단 안내 메시지 */}
      <div className="mt-12 text-center text-gray-600">
        <p>카테고리를 클릭하면 해당 분야의 강의를 볼 수 있습니다</p>
      </div>
    </div>
  );
};

export default CategoriesPage;
