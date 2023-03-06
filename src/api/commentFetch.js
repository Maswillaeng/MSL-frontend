const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createRecommentFetch = async (commentId, value) => {
  return await fetch(`${BASE_URL}/api/recomment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ parentId: commentId, content: value }),
  });
};

export const getRecommentFetch = async (commentId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/recomment/${commentId}`, {
      credentials: "include",
    });
    if (response.ok) {
      const { data } = await response.json();
      return data;
    } else {
      throw new Error("받아오는데 실패");
    }
  } catch (error) {
    console.error(error.message);
  }
};
