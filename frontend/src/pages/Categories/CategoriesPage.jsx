import React from 'react';

const CategoriesPage = () => {
  const categories = [
    { id: 1, name: '백엔드', icon: '💻', count: 25 },
    { id: 2, name: '프론트엔드', icon: '🎨', count: 30 },
    { id: 3, name: 'DevOps', icon: '🚀', count: 15 },
    { id: 4, name: '데이터베이스', icon: '🗄️', count: 20 },
    { id: 5, name: 'AI/ML', icon: '🤖', count: 18 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">카테고리</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div 
            key={category.id}
            className="border rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
          >
            <div className="text-4xl mb-3">{category.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
            <p className="text-gray-600">{category.count}개의 강의</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;