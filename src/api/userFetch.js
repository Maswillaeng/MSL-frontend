const BASE_URL = "http://localhost:8080";

export const loginFetch = async (idValue, passwordValue) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: idValue,
      password: passwordValue,
    }),
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("회원 정보가 일치하지 않습니다.");
  }
};

export const userSignFetch = async (
  emailValue,
  nickNameValue,
  passwordValue
) => {
  return await fetch(`${BASE_URL}/sign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailValue,
      nickName: nickNameValue,
      password: passwordValue,
      userImage:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
    }),
  });
};

export const getUserInfoFetch = async () => {
  return await fetch(`${BASE_URL}/user`);
};

export const userPostListFetch = async (currentPage) => {
  let page = currentPage;
  if (!currentPage) {
    page = "?currentPage=1";
  }
  try {
    const response = await fetch(`${BASE_URL}/userPostList${page}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("notFound");
    }
  } catch (error) {}
};

export const editProfileFetch = async (
  userInfo,
  editUserImage,
  editNickName,
  editIntroduction
) => {
  return await fetch(`${BASE_URL}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...userInfo,
      userImage: editUserImage,
      nickName: editNickName,
      introduction: editIntroduction,
    }),
  });
};

export const checkEmailOverlapFetch = async (value) => {
  return await fetch(`${BASE_URL}/duplicate-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: value }),
  });
};

export const checkNickNameOverlapFetch = async (value) => {
  return await fetch(`${BASE_URL}/duplicate-nickname`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nickName: value }),
  });
};

export const deleteUserFetch = async () => {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("알 수 없는 에러");
    }
  } catch (error) {
    alert(error.message);
  }
};
