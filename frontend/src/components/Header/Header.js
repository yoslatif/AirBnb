// Header.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Header.css';
import Logo from './Logo';
import RightHeader from './RightHeader/RightHeader';
import SearchBar from './SearchBar';

export default function Header({ className, onSearch }) {
  const ui = useSelector((state) => state.ui);
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (typeof onSearch === 'function') {
      onSearch(term); // This will call the `handleSearch` in `App.js`
    } else {
      console.error('No valid onSearch prop provided to Header');
    }
  };

  return (
    <div className="headerWrapper" style={{ position: ui.headerPosition }}>
      <div className={className}>
        <div className="header">
          <Logo />
          <header>
            <SearchBar onSearch={handleSearch} /> {/* Pass the correct function */}
          </header>
          <RightHeader />
        </div>
      </div>
      {className && <div className="line"></div>}
    </div>
  );
}
