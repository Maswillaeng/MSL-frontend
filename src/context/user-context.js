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
      const { email, nickName, phoneNumber, userImage, introduction } =
        val.userData;
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
