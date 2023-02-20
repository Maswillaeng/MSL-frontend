import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfoFetch } from "../api/userFetch";
import UserContext from "../context/user-context";

const AuthTest = (Component, option) => {
  const AuthenticateCheck = () => {
    const { updateUserInfo, setIsLoggedIn } = useContext(UserContext);
    const navigation = useNavigate();

    useEffect(() => {
      const getUserInfoData = async () => {
        try {
          const response = await getUserInfoFetch();
          if (response.ok) {
            const data = await response.json();
            if (data?.loggedIn === false) {
              if (option === "ONLY_LOGIN") {
                navigation("/login");
              }
              setIsLoggedIn(false);
            } else if (data.loggedIn === true) {
              updateUserInfo(data);
              setIsLoggedIn(true);
              if (option === "ONLY_LOGOUT") {
                navigation("/");
              }
            }
          } else {
            throw new Error("서버에러");
          }
        } catch (error) {
          console.error(error.message);
        }
      };
      getUserInfoData();
    }, []);
    return <Component />;
  };
  return <AuthenticateCheck />;
};

export default AuthTest;
