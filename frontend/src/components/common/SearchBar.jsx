import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = "비디오 검색..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 pr-20 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {/* 검색어가 있을 때 X 버튼 표시 */}
      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}

      {/* 검색 버튼 */}
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
      >
        검색
      </button>
    </form>
  );
};

export default SearchBar;
