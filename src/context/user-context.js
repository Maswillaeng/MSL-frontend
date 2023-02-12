import { createContext, useReducer, useState } from "react";
import { getCookie } from "../utility/cookie";

const UserContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userInfo: {},
  updateUserInfo: () => {},
});

const userInfoReducer = (state, { type, val }) => {
  let copyState = JSON.parse(JSON.stringify(state));
  switch (type) {
    case "UPDATE_USER_INFO":
      copyState.email = val?.email ?? copyState.email;
      copyState.nickName = val?.nickName ?? copyState.nickName;
      copyState.phoneNumber = val?.phoneNumber ?? copyState.phoneNumber;
      copyState.userImage = val?.userImage ?? copyState.userImage;
      copyState.introduction = val?.introduction ?? copyState.introduction;
      return copyState;
    default:
      return null;
  }
};
//로그인시 로그인상태와 닉네임 유저이미지를 담을거임
export const UserProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userInfo, dispatchUserInfo] = useReducer(userInfoReducer, {
    email: "",
    phoneNumber: "",
    userImage: "",
    introduction: "",
  });

  const updateUserInfo = (userData) => {
    dispatchUserInfo({
      type: "UPDATE_USER_INFO",
      val: userData,
    });
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userInfo,
        updateUserInfo,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
