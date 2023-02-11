import "../styles/input.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineGlass } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../context/user-context";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const navigation = useNavigate();
  const logoutHandler = async () => {
    let date = new Date();

    const response = await fetch("http://localhost:3000", {
      method: "POST",
    });
    if (response.ok) {
      date.setDate(date.getDate() - 3);
      let setAccessCookie = `ACCESS_TOKEN=main;Expires=${date.toUTCString()}`;
      document.cookie = setAccessCookie;
      let setRefreshCookie = `REFRESH_TOKEN=main;Expires=${date.toUTCString()}`;
      document.cookie = setRefreshCookie;
      setIsLoggedIn(false);
      navigation("/");
    }
  };
  return (
    <div
      id="top"
      className="h-16 flex justify-evenly items-center bg-sub sticky top-0 z-30"
    >
      <div className="text-main font-bold text-3xl">
        <Link className="hidden md:block" to={"/"}>
          Maswillaeng
        </Link>
        <Link className="block md:hidden" to={"/"}>
          <FontAwesomeIcon icon={faWineGlass} />
        </Link>
      </div>
      <form className="flex relative">
        <input
          autoComplete="off"
          className="w-[100%] rounded-[10px] h-7 pl-4"
          placeholder="검색"
          id="search"
        />
        <label className="absolute right-3 top-1" htmlFor="search">
          <FontAwesomeIcon
            className="w-[18px] h-[18px] text-main"
            icon={faMagnifyingGlass}
          />
        </label>
      </form>
      {isLoggedIn ? (
        <>
          <div className=" md:flex md:flex-row md:justify-evenly md:gap-10 ">
            <Link to={"/post/page?currentPage=1"}>
              <button className="button">게시판</button>
            </Link>
            <Link to={"/users/1"}>
              <button className="button">마이페이지</button>
            </Link>
            <Link to={"/logout"}>
              <button onClick={logoutHandler} className="button">
                로그아웃
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className="flex justify-evenly gap-10">
          <Link to={"/post/page?currentPage=1"}>
            <button className="button">게시판</button>
          </Link>
          <Link to={"/login"}>
            <button className="button">로그인</button>
          </Link>
          <Link to={"/sign"}>
            <button className="button">회원가입</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
