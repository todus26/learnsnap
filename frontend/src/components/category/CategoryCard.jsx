import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  // 카테고리별 아이콘 매핑
  const getCategoryIcon = (name) => {
    const iconMap = {
      '백엔드': '💻',
      'Backend': '💻',
      '프론트엔드': '🎨',
      'Frontend': '🎨',
      'DevOps': '🚀',
      '데이터베이스': '🗄️',
      'Database': '🗄️',
      'AI/ML': '🤖',
      'AI': '🤖',
      'Machine Learning': '🤖',
      '모바일': '📱',
      'Mobile': '📱',
      '보안': '🔒',
      'Security': '🔒',
      '클라우드': '☁️',
      'Cloud': '☁️',
      '네트워크': '🌐',
      'Network': '🌐',
      '알고리즘': '🧮',
      'Algorithm': '🧮',
    };
    return iconMap[name] || '📚';
  };

  // 카테고리별 배경 그라디언트
  const getCategoryGradient = (index) => {
    const gradients = [
      'from-blue-400 to-blue-600',
      'from-purple-400 to-purple-600',
      'from-green-400 to-green-600',
      'from-orange-400 to-orange-600',
      'from-pink-400 to-pink-600',
      'from-indigo-400 to-indigo-600',
      'from-red-400 to-red-600',
      'from-teal-400 to-teal-600',
    ];
    return gradients[index % gradients.length];
  };

  // 카테고리 클릭 핸들러
  const handleClick = () => {
    navigate(`/videos?category=${category.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative border rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
    >
      {/* 배경 그라디언트 */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(category.id)} opacity-10 group-hover:opacity-20 transition-opacity`}></div>

      {/* 콘텐츠 */}
      <div className="relative p-6">
        {/* 아이콘 */}
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
          {category.icon || getCategoryIcon(category.name)}
        </div>

        {/* 카테고리 이름 */}
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
          {category.name}
        </h3>

        {/* 설명 */}
        {category.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {category.description}
          </p>
        )}

        {/* 비디오 개수 */}
        <div className="flex items-center justify-between">
          <p className="text-gray-700 font-semibold">
            {category.videoCount !== undefined 
              ? `${category.videoCount}개의 강의`
              : '강의 개수 정보 없음'}
          </p>
          <span className="text-blue-500 group-hover:translate-x-2 transition-transform">
            →
          </span>
        </div>
      </div>

      {/* 하단 테두리 효과 */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${getCategoryGradient(category.id)}`}></div>
    </div>
  );
};

export default CategoryCard;
