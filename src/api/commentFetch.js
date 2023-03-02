const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createRecommentFetch = async (commentId, value) => {
  return await fetch(`${BASE_URL}/api/recomment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ commentId, content: value }),
  });
};

export const deleteRecommentFetch = async (commentId) => {
  return await fetch(`${BASE_URL}/api/recomment/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export const editRecommentFetch = async (value, commentId) => {
  return await fetch(`${BASE_URL}/api/recomment`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId: commentId, content: value }),
    credentials: "include",
  });
};
