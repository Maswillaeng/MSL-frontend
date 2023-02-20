import basicProfile from "../assets/basic_profile.jpg";

const BASE_URL = "http://localhost:8080";

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
  return await fetch(`${BASE_URL}/api/user`, {
    credentials: "include",
  });
};

export const getSomeoneUserInfoFetch = async (userId) => {
  try {
    return await fetch(`${BASE_URL}/api/userInfo/${userId}`, {
      credentials: "include",
    });
  } catch (error) {}
};

export const userPostListFetch = async (category, userId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/userPostList?userId=${userId}${
        category && `&?category=${category}`
      }`
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("notFound");
    }
  } catch (error) {}
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
