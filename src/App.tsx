import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchResults from './components/SearchResults';
import LoadMoreButton from './components/LoadMoreButton';

const App: React.FC = () => {
  const [results, setResults] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastQuery, setLastQuery] = useState('');
  const [latestQuery, setLatestQuery] = useState('');
  const [countries, setCountries] = useState<string[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          'https://freetestapi.com/api/v1/countries'
        );
        const countriesList = response.data.map((country: any) => country.name);
        setCountries(countriesList);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleResults = useCallback(
    (newResults: string[], query: string) => {
      if (query !== lastQuery) {
        setResults(newResults);
        setCurrentPage(0);
      } else {
        setResults((prevResults) => {
          const uniqueResults = Array.from(
            new Set([...prevResults, ...newResults])
          );
          return uniqueResults;
        });
      }
      setLastQuery(query);
    },
    [lastQuery]
  );

  const handleQueryChange = useCallback((query: string) => {
    setLatestQuery(query);
    if (query.length === 0) {
      setResults([]);
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, []);

  const handleLoadMore = useCallback(() => {
    setCurrentPage((prevPage) => prevPage + 1);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">
        Search Countries
      </h1>
      <SearchBox
        onResults={handleResults}
        onQueryChange={handleQueryChange}
        countries={countries}
        setIsFocused={setIsFocused}
        clearResults={() => setResults([])}
      />
      {isEmpty && isFocused ? (
        <div className="bg-white shadow-md rounded p-4 mt-4">
          <p className="text-gray-500">
            Type at least 3 characters to start searching
          </p>
        </div>
      ) : !isEmpty && results.length === 0 && lastQuery.length >= 3 ? (
        <>
          <div className="bg-white shadow-md rounded p-4 mt-4">
            <p className="text-gray-500">No results found</p>
          </div>
        </>
      ) : (
        <>
          <SearchResults
            results={results}
            currentPage={currentPage}
            resultsPerPage={5}
          />
          <LoadMoreButton
            onLoadMore={handleLoadMore}
            isVisible={results.length > (currentPage + 1) * 5}
          />
        </>
      )}
    </div>
  );
};

export default App;
