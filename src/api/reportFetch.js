const BASE_URL = process.env.REACT_APP_BASE_URL;

export const reportPostFetch = async (method, postId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/report/${postId}`, {
      method,
      credentials: "include",
    });
    if (response.ok) {
      return response;
    } else {
      throw new Error("에러");
    }
  } catch (error) {
    console.error("에러");
  }
};
