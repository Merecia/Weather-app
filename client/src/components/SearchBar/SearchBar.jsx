import React from 'react';
import style from './SearchBar.module.scss';

const SearchBar = ({ value, onChange, placeholder, onKeyDown }) => {
    return (
        <div className = {style.SearchBar}>
            <input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onKeyDown={onKeyDown}
            />
        </div>
    );
}

export default SearchBar;