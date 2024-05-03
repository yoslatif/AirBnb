import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Header.css';
import Logo from './Logo';
import RightHeader from './RightHeader/RightHeader'
import SearchBar from './SearchBar';

export default function Header({ className, onSearch }) {
    const ui = useSelector(state => state.ui);
    const history = useHistory();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
        // Call onSearch function with the current search term
        onSearch(term);
    };

    console.log("on spot details?", history.location.pathname.includes("spot"));
    return (
        <div className="headerWrapper" style={{ position: ui.headerPosition }}>
            <div className={className}>
                <div className="header">
                    <Logo />
                    <header>
                        {/* Pass handleSearch as prop to SearchBar */}
                        <SearchBar onSearch={handleSearch} />
                    </header>
                    <RightHeader />
                </div>
            </div>
            {className && <div className="line"></div>}
        </div >
    );
}
