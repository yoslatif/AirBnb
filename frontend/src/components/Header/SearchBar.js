// Header/SearchBar.js

import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
};

const handleSubmit = (event) => {
    event.preventDefault();
    // Call onSearch function with the current search term
    onSearch(searchTerm);
};


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by location or name..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};
