const BASE_URL = process.env.REACT_APP_BASE_URL;

export const updateToken = async (url, options, method = "GET") => {
  try {
    const tokenResponse = await fetch(`${BASE_URL}/api/updateToken`, {
      method: "GET",
      credentials: "include",
    });
    if (tokenResponse.ok) {
      return await fetch(`${BASE_URL}/${url}`, {
        method,
        ...options,
      });
    } else {
    }
  } catch (error) {
    return error.message;
  }
};
