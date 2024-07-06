import { render, screen, fireEvent } from '@testing-library/react';
import LoadMoreButton from './LoadMoreButton';

test('renders LoadMoreButton component', () => {
  render(<LoadMoreButton onLoadMore={jest.fn()} isVisible={true} />);
  const buttonElement = screen.getByText(/Load More/i);
  expect(buttonElement).toBeInTheDocument();
});

test('calls onLoadMore on button click', () => {
  const mockOnLoadMore = jest.fn();
  render(<LoadMoreButton onLoadMore={mockOnLoadMore} isVisible={true} />);
  const buttonElement = screen.getByText(/Load More/i);
  fireEvent.click(buttonElement);
  expect(mockOnLoadMore).toHaveBeenCalled();
});
