import React, { useState, useEffect, useCallback } from 'react';

type Props = {
  onResults: (results: string[], query: string) => void;
  onQueryChange: (query: string) => void;
  countries: string[];
  setIsFocused: (isFocused: boolean) => void;
  clearResults: () => void;
};

const SearchBox: React.FC<Props> = ({
  onResults,
  onQueryChange,
  countries,
  setIsFocused,
  clearResults,
}) => {
  const [query, setQuery] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const cache = React.useRef<{ [key: string]: string[] }>({});

  const handleSearch = useCallback(
    (searchQuery: string) => {
      if (searchQuery.length === 0) {
        onResults([], searchQuery);
        return;
      }

      if (searchQuery.length < 3) return;

      if (cache.current[searchQuery]) {
        onResults(cache.current[searchQuery], searchQuery);
      } else {
        const filteredCountries = countries.filter((country) =>
          country.toLowerCase().includes(searchQuery.toLowerCase())
        );
        cache.current[searchQuery] = filteredCountries;
        onResults(filteredCountries, searchQuery);
      }
    },
    [countries, onResults]
  );

  useEffect(() => {
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      handleSearch(query);
    }, 500);
    setTimer(newTimer);
  }, [query, handleSearch]);

  useEffect(() => {
    onQueryChange(query);
  }, [query, onQueryChange]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="start searching for countries..."
        aria-label="Search input"
        className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:border-indigo-500 pl-10 pr-10"
      />
      <div className="absolute top-4 left-3 text-gray-400">
        <img src="/icons/search.svg" alt="search-icon" className="w-4 h-4" />
      </div>
      {query && (
        <div
          className="absolute top-3 right-3 text-gray-400 cursor-pointer"
          onClick={() => {
            setQuery('');
            clearResults();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
