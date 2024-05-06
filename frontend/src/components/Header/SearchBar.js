// SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css'; // Make sure to include the CSS file

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof onSearch === 'function') {
      onSearch(searchTerm);
    } else {
      console.error('onSearch is not defined or not a function');
    }
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
      <button type="submit" className="search-button">Search</button>
    </form>
  );
}
