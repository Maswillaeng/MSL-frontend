import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfoFetch } from "../api/userFetch";
import UserContext from "../context/user-context";

const AuthTest = (Component, option) => {
  const AuthenticateCheck = () => {
    const { updateUserInfo, setIsLoggedIn } = useContext(UserContext);
    const navigation = useNavigate();

    useEffect(() => {
      //서버에서 무조건 401을 내면 안되지
      //401
      const getUserInfoData = async () => {
        try {
          const response = await getUserInfoFetch();
          if (response.status === 401) {
            if (option === "ONLY_LOGIN") {
              navigation("/sign");
            }
            setIsLoggedIn(false);
          } else if (response.status === 200) {
            //토큰이없는 사용자가 로그인 유무에 상ㅇ관없는 페이지에 접근하려 할 때
            //토큰이 있는지 없는지루 구분을 할까?
            const userData = await response.json();
            updateUserInfo(userData);
            setIsLoggedIn(true);
            if (option === "ONLY_LOGOUT") {
              navigation("/");
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      getUserInfoData();
    }, []);
    return <Component />;
  };
  return <AuthenticateCheck />;
};

export default AuthTest;
