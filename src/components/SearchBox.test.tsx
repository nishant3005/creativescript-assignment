import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBox from '../components/SearchBox';

describe('SearchBox', () => {
  const mockOnResults = jest.fn();
  const mockOnQueryChange = jest.fn();
  const mockSetIsFocused = jest.fn();
  const mockClearResults = jest.fn();
  const countries = ['India', 'Indonesia', 'United States', 'United Kingdom'];

  beforeEach(() => {
    mockOnResults.mockClear();
    mockOnQueryChange.mockClear();
    mockSetIsFocused.mockClear();
    mockClearResults.mockClear();
  });

  test('should render the search input box', () => {
    render(
      <SearchBox
        onResults={mockOnResults}
        onQueryChange={mockOnQueryChange}
        countries={countries}
        setIsFocused={mockSetIsFocused}
        clearResults={mockClearResults}
      />
    );
    expect(
      screen.getByPlaceholderText('smallcase, manager or a stock')
    ).toBeInTheDocument();
  });

  test('should call onQueryChange and setIsFocused when typing in the input box', () => {
    render(
      <SearchBox
        onResults={mockOnResults}
        onQueryChange={mockOnQueryChange}
        countries={countries}
        setIsFocused={mockSetIsFocused}
        clearResults={mockClearResults}
      />
    );
    const input = screen.getByPlaceholderText('smallcase, manager or a stock');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Ind' } });

    expect(mockOnQueryChange).toHaveBeenCalledWith('Ind');
    expect(mockSetIsFocused).toHaveBeenCalledWith(true);
  });

  test('should clear input and results when cross icon is clicked', () => {
    render(
      <SearchBox
        onResults={mockOnResults}
        onQueryChange={mockOnQueryChange}
        countries={countries}
        setIsFocused={mockSetIsFocused}
        clearResults={mockClearResults}
      />
    );
    const input = screen.getByPlaceholderText('smallcase, manager or a stock');
    fireEvent.change(input, { target: { value: 'Ind' } });

    // Wait for the cross icon to appear
    const crossIcon = screen.getByRole('img', { hidden: true });
    fireEvent.click(crossIcon);

    expect(input).toHaveValue('');
    expect(mockClearResults).toHaveBeenCalled();
  });

  test('should show message when input is focused and empty', () => {
    render(
      <SearchBox
        onResults={mockOnResults}
        onQueryChange={mockOnQueryChange}
        countries={countries}
        setIsFocused={mockSetIsFocused}
        clearResults={mockClearResults}
      />
    );
    const input = screen.getByPlaceholderText('smallcase, manager or a stock');
    fireEvent.focus(input);

    expect(
      screen.getByText('Type at least 3 characters to start searching')
    ).toBeInTheDocument();
  });

  test('should not show message when input is not focused', () => {
    render(
      <SearchBox
        onResults={mockOnResults}
        onQueryChange={mockOnQueryChange}
        countries={countries}
        setIsFocused={mockSetIsFocused}
        clearResults={mockClearResults}
      />
    );
    const input = screen.getByPlaceholderText('smallcase, manager or a stock');
    fireEvent.blur(input);

    expect(
      screen.queryByText('Type at least 3 characters to start searching')
    ).not.toBeInTheDocument();
  });
});
