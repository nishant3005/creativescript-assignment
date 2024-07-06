import React from 'react';

type Props = {
  results: string[];
  currentPage: number;
  resultsPerPage: number;
};

const SearchResults: React.FC<Props> = ({
  results,
  currentPage,
  resultsPerPage,
}) => {
  const startIndex = currentPage * resultsPerPage;
  const paginatedResults = results.slice(
    startIndex,
    startIndex + resultsPerPage
  );

  return (
    <>
      {results.length > 0 && (
        <>
          <ul className="bg-white shadow-md rounded p-4 mt-4">
            {paginatedResults.map((result, index) => (
              <li
                key={index}
                className="p-2 border-b border-gray-200 last:border-none hover:bg-gray-50"
              >
                {result}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default SearchResults;
