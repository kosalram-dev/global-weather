import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Header, HeaderProps} from '../../src/components';
import {APPLICATION_CONSTANTS, TEST_IDS} from '../../src/helpers/constants';

describe('Header component', () => {
  let handleSearchMock: jest.Mock;

  beforeAll(() => {
    handleSearchMock = jest.fn();
  });

  test('renders correctly with search input hidden by default', () => {
    const props: HeaderProps = {
      handleSearch: handleSearchMock,
      toggleSearch: false,
      setToggleSearch: jest.fn(),
    };

    const {queryByPlaceholderText, getByTestId} = render(<Header {...props} />);

    // Check if the search input is hidden by default
    expect(
      queryByPlaceholderText(APPLICATION_CONSTANTS.SEARCH_CITY_PLACEHOLDER),
    ).toBeNull();

    // Check if the search button is visible
    expect(getByTestId(TEST_IDS.SEARCH_ICON)).not.toBeNull();
  });

  test('renders correctly with search input visible when toggled', () => {
    const props: HeaderProps = {
      handleSearch: handleSearchMock,
      toggleSearch: true,
      setToggleSearch: jest.fn(),
    };
    const {getByPlaceholderText, getByTestId} = render(<Header {...props} />);

    // Click the search button to toggle the search input
    fireEvent.press(getByTestId(TEST_IDS.SEARCH_BUTTON));

    // Check if the search input is visible after toggle
    expect(
      getByPlaceholderText(APPLICATION_CONSTANTS.SEARCH_CITY_PLACEHOLDER),
    ).not.toBeNull();
  });

  test('calls handleSearch function when typing in search input', () => {
    const props: HeaderProps = {
      handleSearch: handleSearchMock,
      toggleSearch: true,
      setToggleSearch: jest.fn(),
    };
    const {getByPlaceholderText} = render(<Header {...props} />);

    // Type into the search input
    fireEvent.changeText(
      getByPlaceholderText(APPLICATION_CONSTANTS.SEARCH_CITY_PLACEHOLDER),
      'New York',
    );

    // Check if handleSearch function is called with correct value
    expect(handleSearchMock).toHaveBeenCalledWith('New York');
  });
});
