export const request = async (url, config = {}) => {
  try {
    const response = await fetch(url, config);
    if (response.ok) return await response.json();
    throw new Error(`Fetch error`);
  } catch (e) {
    throw new Error(`Fetch error`);
  }
};
