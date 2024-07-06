import React from 'react';

type Props = {
  onLoadMore: () => void;
  isVisible: boolean;
};

const LoadMoreButton: React.FC<Props> = ({ onLoadMore, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={onLoadMore}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreButton;
