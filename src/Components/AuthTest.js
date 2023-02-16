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
            const { data } = await response.json();
            if (data.loggedIn === false) {
              //이거 오는 데이터가 어떻게 되는지
              if (option === "ONLY_LOGIN") {
                navigation("/sign");
              }
              setIsLoggedIn(false);
              //토큰이 없는 사용자가
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
