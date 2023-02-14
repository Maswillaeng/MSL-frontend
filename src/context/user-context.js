import { createContext, useReducer, useState } from "react";

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
      copyState.email = val?.email;
      copyState.nickName = val?.nickName;
      copyState.userImage = val?.userImage;
      copyState.introduction = val?.introduction;
      return copyState;
    default:
      return null;
  }
};

export const UserProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, dispatchUserInfo] = useReducer(userInfoReducer, {
    email: "",
    nickName: "",
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
