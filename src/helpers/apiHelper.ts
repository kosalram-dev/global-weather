const apiCall = async (url: string) => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

export default apiCall;
