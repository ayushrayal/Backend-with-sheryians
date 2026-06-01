import React from 'react';
import './shared.scss';

const SearchBar = ({ value, onChange, placeholder = "Search accounts..." }) => {
    return (
        <div className="shared-search">
            <span className="search-icon-wrapper">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </span>
            <input 
                type="text" 
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;
