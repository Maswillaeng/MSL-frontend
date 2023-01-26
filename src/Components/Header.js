import "../styles/input.css";
import { Link } from "react-router-dom";
import Button from "./UI/Button";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faWineGlass } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isLoggedIn] = useState(true);

  const clickMenuBar = () => {};
  return (
    <div className="h-16 flex justify-evenly items-center bg-sub sticky top-0">
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
            <Link to={"/post/1"}>
              <Button text="게시판" />
            </Link>
            <Link to={"/users/1"}>
              <Button text="마이 페이지" />
            </Link>
            <Link to={"/logout"}>
              <Button text="로그아웃" />
            </Link>
          </div>
        </>
      ) : (
        <div className="flex justify-evenly gap-10">
          <Link to={"/post/1"}>
            <Button text="게시판" />
          </Link>
          <Link to={"/login"}>
            <Button text="Login" />
          </Link>
          <Link to={"/sign"}>
            <Button text="Join" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
