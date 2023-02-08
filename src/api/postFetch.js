const BASE_URL = "http://localhost:8080";

export const createPostFetch = async (nickName, title, editorToHtml) => {
  try {
    const response = await fetch(`${BASE_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({
        nickName,
        title,
        content: editorToHtml,
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
    const response = await fetch(`${BASE_URL}/post/${postId}`, {
      method: "PUT",
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
    const response = await fetch(`${BASE_URL}/post/${postId}`, {
      method: "DELETE",
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
    const response = await fetch(`${BASE_URL}/post/${postId}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("notFound");
    }
  } catch (error) {
    alert(error.message);
  }
};

export const getPostListFetch = async (postPage) => {
  try {
    const response = await fetch(`${BASE_URL}/post/page${postPage}`);
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
