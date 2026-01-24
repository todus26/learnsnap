import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // 페이지 번호 배열 생성
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);
    
    // 끝에서 시작할 경우 조정
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {/* 이전 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className={`px-3 py-2 rounded ${
          currentPage === 0
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white border hover:bg-gray-50'
        }`}
      >
        이전
      </button>

      {/* 첫 페이지 */}
      {pageNumbers[0] > 0 && (
        <>
          <button
            onClick={() => onPageChange(0)}
            className="px-3 py-2 rounded bg-white border hover:bg-gray-50"
          >
            1
          </button>
          {pageNumbers[0] > 1 && <span className="px-2">...</span>}
        </>
      )}

      {/* 페이지 번호들 */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded ${
            page === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-white border hover:bg-gray-50'
          }`}
        >
          {page + 1}
        </button>
      ))}

      {/* 마지막 페이지 */}
      {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 2 && (
            <span className="px-2">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages - 1)}
            className="px-3 py-2 rounded bg-white border hover:bg-gray-50"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* 다음 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className={`px-3 py-2 rounded ${
          currentPage >= totalPages - 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white border hover:bg-gray-50'
        }`}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
