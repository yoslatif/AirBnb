// SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearched, setIsSearched] = useState(false); // State to track if a search was conducted

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof onSearch === 'function') {
      onSearch(searchTerm);
      setIsSearched(true); // Set state to indicate a search was conducted
    } else {
      console.error('onSearch is not defined or not a function');
    }
  };

  // Reset search term to clear the input field and reset the search state
  const handleReset = () => {
    setSearchTerm('');
    onSearch(''); // Call the search function to clear the results
    setIsSearched(false); // Reset state to hide the clear button
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
      {/* Conditionally display the clear button if a search has been conducted */}
      {isSearched && (
        <button type="button" className="reset-button" onClick={handleReset}>
          clear
        </button>
      )}
      <button type="submit" className="search-button">Search</button>
    </form>
  );
}
