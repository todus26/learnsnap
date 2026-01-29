import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const HomePage = () => {
  const categories = [
    {
      title: '백엔드',
      description: 'Node.js, Python, Java, Spring Boot',
      icon: '💻',
    },
    {
      title: '프론트엔드',
      description: 'React, Vue, JavaScript',
      icon: '🎨',
    },
    {
      title: 'DevOps',
      description: 'Docker, Kubernetes, CI/CD',
      icon: '🚀',
    },
  ];

  return (
    <div className="bg-secondary-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border-b border-secondary-200">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              전문 지식을 짧은 영상으로 학습하세요
            </h1>
            <p className="text-lg md:text-xl text-secondary-600 mb-8">
              LearnSnap에서 3-5분 전문 강의로 빠르게 성장하세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/videos">
                <Button variant="primary" size="lg">
                  학습 시작하기
                </Button>
              </Link>
              <Link to="/categories">
                <Button variant="outline" size="lg">
                  카테고리 둘러보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
          인기 카테고리
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <Card key={index} padding="lg" shadow="soft" hover>
              <div className="text-center">
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-secondary-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-secondary-600">{category.description}</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/categories">
            <Button variant="ghost" size="md">
              모든 카테고리 보기 →
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white border-t border-secondary-200">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center">
            LearnSnap의 특징
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">
                짧고 집중적인 학습
              </h3>
              <p className="text-secondary-600">
                3-5분의 짧은 영상으로 핵심만 빠르게 습득하세요
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">
                검증된 강사진
              </h3>
              <p className="text-secondary-600">
                현업 전문가의 실무 중심 강의를 만나보세요
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">
                게이미피케이션
              </h3>
              <p className="text-secondary-600">
                스트릭, 뱃지, 리더보드로 재미있게 학습하세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            무료로 가입하고 전문 지식을 학습하세요
          </p>
          <Link to="/signup">
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-primary-600 hover:bg-secondary-50"
            >
              무료 회원가입
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
