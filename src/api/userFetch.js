import { updateToken } from "./updateToken";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const loginFetch = async (idValue, passwordValue) => {
  const response = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email: idValue,
      password: passwordValue,
    }),
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("회원 정보가 일치하지 않습니다.");
  }
};

export const logoutFetch = async () => {
  return await fetch(`${BASE_URL}/api/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export const userSignFetch = async (
  emailValue,
  nickNameValue,
  passwordValue
) => {
  return await fetch(`${BASE_URL}/api/sign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email: emailValue,
      nickName: nickNameValue,
      password: passwordValue,
    }),
  });
};

export const getUserInfoFetch = async () => {
  const response = await fetch(`${BASE_URL}/api/user`, {
    credentials: "include",
  });
  if (response.status === 401) {
    return await updateToken("/api/user", { credentials: "include" });
  } else if (response.ok) {
    return response;
  }
};

export const getSomeoneUserInfoFetch = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/userInfo/${userId}`, {
      credentials: "include",
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {}
};

export const userPostListFetch = async (category, userId, offset) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/post/user?userId=${userId}${
        category && `&category=${category}`
      }&page=${offset}`,
      { credentials: "include" }
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

export const editProfileFetch = async (
  editUserImage,
  editNickName,
  editIntroduction
) => {
  return await fetch(`${BASE_URL}/api/user`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userImage: editUserImage,
      nickName: editNickName,
      introduction: editIntroduction,
    }),
  });
};

export const checkEmailOverlapFetch = async (value) => {
  return await fetch(`${BASE_URL}/api/duplicate-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: value }),
  });
};

export const checkNickNameOverlapFetch = async (value) => {
  return await fetch(`${BASE_URL}/api/duplicate-nickname`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nickName: value }),
  });
};

export const deleteUserFetch = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/user`, {
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

export const imPortFetch = async (res) => {
  return await fetch(`${BASE_URL}/api-certifications`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imp_uid: res.imp_uid }),
  });
};
