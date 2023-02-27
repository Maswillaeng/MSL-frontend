const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createPostFetch = async (
  nickName,
  title,
  editorToHtml,
  category
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        nickName,
        title,
        content: editorToHtml,
        category,
      }),
    });
    if (response.ok) {
      alert("생성 완료!");
    } else {
      throw new Error("알 수 없는 에러 발생!");
    }
  } catch (error) {
    alert(error.message);
  }
};

export const updatePostFetch = async (
  thumbnail,
  title,
  editorToHtml,
  postId,
  categoryId
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/post`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        thumbnail,
        title,
        content: editorToHtml,
        postId,
        category: categoryId,
      }),
    });
    if (response.ok) {
      //
    } else {
      throw new Error("알 수 없는 에러 발생!");
    }
  } catch (error) {
    alert(error.message);
  }
};

export const deletePostFetch = async (postId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/post/${postId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("알 수 없는 에러");
    }
  } catch (error) {
    alert(error.message);
  }
};

export const getPostDetailFetch = async (postId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/post/${postId}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("notFound");
    }
  } catch (error) {
    alert(error.message);
  }
};

export const getPostListFetch = async (category) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/post${category ? `?category=${category}` : ""}`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("notFound");
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const changeImgFormat = async (imageObject) => {
  console.log("hi");
  try {
    const response = await fetch(`${BASE_URL}/api/changeFormatImage`, {
      method: "POST",
      credentials: "include",
      body: imageObject,
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("변환 되지 않았습니다.");
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const updateLikeNumberFetch = async (postId, method) => {
  return await fetch(`${BASE_URL}/api/post-like/${postId}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export const updateCommentLikeNumberFetch = async (commentId, method) => {
  return await fetch(`${BASE_URL}/api/comment-like/${commentId}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export const createCommentFetch = async (postId, value) => {
  return await fetch(`${BASE_URL}/api/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ postId, content: value }),
  });
};

export const deleteCommentFetch = async (commentId) => {
  return await fetch(`${BASE_URL}/api/comment/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export const editCommentFetch = async (value, commentId) => {
  return await fetch(`${BASE_URL}/api/comment`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId: commentId, content: value }),
    credentials: "include",
  });
};
