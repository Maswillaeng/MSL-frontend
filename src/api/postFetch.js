const BASE_URL = "http://localhost:8080";

export const createPostFetch = async (
  nickName,
  title,
  editorToHtml,
  category
) => {
  try {
    const response = await fetch(`${BASE_URL}/api-post`, {
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
  nickName,
  title,
  editorToHtml,
  postId,
  userImage
) => {
  try {
    const response = await fetch(`${BASE_URL}/api-post/${postId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickName,
        title,
        content: editorToHtml,
        userImage,
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
    const response = await fetch(`${BASE_URL}/api-post/${postId}`, {
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
    const response = await fetch(`${BASE_URL}/api-post/${postId}`);
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
    const response = await fetch(`${BASE_URL}/api-post?category=${category}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("notFound");
    }
  } catch (error) {
    alert(error.message);
    //notFound페이지로
  }
};

export const changeImgFormat = async (imageObject) => {
  try {
    const response = await fetch(`${BASE_URL}/api-changeFomatImage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(imageObject),
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

export const updateLikeNumberFetch = async (sendLikeValue) => {
  return await fetch(`${BASE_URL}/api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(sendLikeValue),
  });
};

export const updateCommentLikeNumberFetch = async (sendLikeValue) => {
  return await fetch(`${BASE_URL}/api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(sendLikeValue),
  });
};

export const createCommentFetch = async (value) => {
  return await fetch(`${BASE_URL}/api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(value),
  });
};
