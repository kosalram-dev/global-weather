import apiCall from '../../src/helpers/apiHelper';
import fetchMock from 'jest-fetch-mock';

// Mocking the fetch function
fetchMock.enableMocks();

describe('apiCall function', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('fetches data from the API and returns the result', async () => {
    const mockUrl = 'https://example.com/api/data';
    const mockResult = {data: 'mock data'};

    // Mocking the fetch response
    fetchMock.mockResponseOnce(JSON.stringify(mockResult));

    // Call the apiCall function with the mock URL
    const result = await apiCall(mockUrl);

    // Verify that fetch is called with the correct URL
    expect(fetchMock).toHaveBeenCalledWith(mockUrl);

    // Verify that the result matches the mock data
    expect(result).toEqual(mockResult);
  });

  test('handles errors and returns null', async () => {
    const mockUrl = 'https://example.com/api/data';

    // Mocking a failed fetch response
    fetchMock.mockRejectOnce(new Error('Failed to fetch'));

    // Call the apiCall function with the mock URL
    const result = await apiCall(mockUrl);

    // Verify that fetch is called with the correct URL
    expect(fetchMock).toHaveBeenCalledWith(mockUrl);

    // Verify that the result is null
    expect(result).toBeNull();
  });
});
