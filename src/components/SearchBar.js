'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * SearchBar component with debounced input
 * @param {Object} props
 * @param {string} props.value - Current search query
 * @param {Function} props.onChange - Callback when search query changes
 * @param {string} props.placeholder - Placeholder text
 * @param {number} props.debounceMs - Debounce delay in milliseconds (default: 300)
 */
const SearchBar = ({ 
  value = '', 
  onChange, 
  placeholder = 'Search products...', 
  debounceMs = 300 
}) => {
  const [localValue, setLocalValue] = useState(value);

  // Update local value when prop changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounced onChange
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue, value, onChange, debounceMs]);

  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  const handleClear = useCallback(() => {
    setLocalValue('');
    onChange('');
  }, [onChange]);

  return (
    <div className="search-bar position-relative">
      <div className="input-group">
        <span className="input-group-text bg-transparent border-end-0">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </span>
        <input
          type="text"
          className="form-control border-start-0 ps-0"
          placeholder={placeholder}
          value={localValue}
          onChange={handleChange}
          aria-label="Search products"
        />
        {localValue && (
          <button
            className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted"
            onClick={handleClear}
            aria-label="Clear search"
            style={{ zIndex: 10 }}
          >
            <svg
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
