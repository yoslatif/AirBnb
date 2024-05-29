// SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof onSearch === 'function') {
      onSearch(searchTerm);
      setIsSearched(true);
    } else {
      console.error('onSearch is not defined or not a function');
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    onSearch('');
    setIsSearched(false);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search by location or name..."
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
      {isSearched && (
        <button type="button" className="reset-button" onClick={handleReset}>
          Clear
        </button>
      )}
      <button type="submit" className="search-button">Search</button>
    </form>
  );
}
