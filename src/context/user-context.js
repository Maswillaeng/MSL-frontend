import { createContext, useReducer, useState } from "react";

const UserContext = createContext({
  isLoggedIn: true,
  setIsLoggedIn: () => {},
  userInfo: {},
  getUserInfo: () => {},
  updateUserInfo: () => {},
});

const userInfoReducer = (state, { type, val }) => {
  let copyState = JSON.parse(JSON.stringify(state));
  switch (type) {
    case "UPDATE_USER_INFO":
      copyState.nickName = val.nickName ?? copyState.nickName;
      copyState.userImage = val.userImage ?? copyState.userImage;
      copyState.introduction = val.introduction ?? copyState.introduction;
      return copyState;
    case "GET_USER_INFO":
      const {
        email = "",
        nickName = "",
        phoneNumber = "",
        userImage = "",
        introduction = "",
      } = val.userData;
      copyState.email = email ?? copyState.email;
      copyState.nickName = nickName ?? copyState.nickName;
      copyState.phoneNumber = phoneNumber ?? copyState.phoneNumber;
      copyState.userImage = userImage ?? copyState.userImage;
      copyState.introduction = introduction ?? copyState.introduction;
      return copyState;
    default:
      return null;
  }
};

export const UserProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userInfo, dispatchUserInfo] = useReducer(userInfoReducer, {
    email: "",
    nickName: "",
    phoneNumber: "",
    userImage: "",
    introduction: "",
  });

  const updateUserInfo = (nickName, userImage, introduction) => {
    dispatchUserInfo({
      type: "UPDATE_USER_INFO",
      val: { nickName, userImage, introduction },
    });
  };

  const getUserInfo = (userData) => {
    dispatchUserInfo({ type: "GET_USER_INFO", val: { userData } });
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userInfo,
        updateUserInfo,
        getUserInfo,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
