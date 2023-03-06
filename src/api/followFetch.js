const BASE_URL = process.env.REACT_APP_BASE_URL;

export const changeFollowStateFetch = async (method, userId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/following/${userId}`, {
      method,
      credentials: "include",
    });
    if (response.ok) {
      return true;
    } else {
      throw new Error("에러");
    }
  } catch (error) {
    console.error("에러");
  }
};

export const getFollowerAndFollowingFetch = async (userId, id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/${id}-list/${userId}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("에러");
    }
  } catch (error) {
    console.error(error.message);
  }
};
