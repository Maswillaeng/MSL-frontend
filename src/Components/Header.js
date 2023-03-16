import "../styles/input.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faComment,
  faPen,
  faWineGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../context/user-context";
import { logoutFetch } from "../api/userFetch";
import basicImage from "../assets/basic_thumbnail.png";
import DropDown from "./UI/DropDown";
import { useRef } from "react";
import useFindOpenBarAndClose from "../hooks/useFindOpenBarAndClose";
import SocketContext from "../context/socket-context";
import { useEffect } from "react";
import { useState } from "react";
import { faComments } from "@fortawesome/free-regular-svg-icons";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, userInfo } = useContext(UserContext);
  const socket = useContext(SocketContext);
  const navigation = useNavigate();
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useFindOpenBarAndClose(dropDownRef, false);
  const [messageAlram, setMessageAlram] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn || !socket) return;

    if (location.pathname === "/chat") return;
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "ALRAM") {
        setMessageAlram(message.data);
      }
    };
  }, [isLoggedIn, socket, location.pathname]);

  const logoutHandler = async () => {
    const response = await logoutFetch();
    if (response.ok) {
      setIsLoggedIn(false);
      navigation("/");
    }
  };

  const openButtonText = `  <button>
      <img style="object-fit:cover; object-position: center; border-radius:50%; width:45px; height:45px;" alt="유저 프로필 이미지" src=${
        userInfo.userImage || basicImage
      }/>
    </button>`;

  return (
    <div
      id="top"
      className="h-16 w-screen flex justify-around items-center bg-sub sticky top-0 z-30"
    >
      <div className="text-main font-bold text-3xl">
        <Link
          className="hidden md:block"
          to={`/${
            localStorage.getItem("postCategory")
              ? `?category=${localStorage.getItem("postCategory")}`
              : ""
          }`}
        >
          Maswillaeng
        </Link>
        <Link
          className="block md:hidden"
          to={`/${
            localStorage.getItem("postCategory")
              ? `?category=${localStorage.getItem("postCategory")}`
              : ""
          }`}
        >
          <FontAwesomeIcon icon={faWineGlass} />
        </Link>
      </div>
      {isLoggedIn ? (
        <>
          <div className="flex items-center gap-7">
            <Link to={"/search"}>
              <FontAwesomeIcon
                className="w-[18px] h-[18px] text-main"
                icon={faMagnifyingGlass}
              />
            </Link>
            <div>
              <Link to={"/post/create"}>
                <FontAwesomeIcon className="text-main" icon={faPen} />
              </Link>
            </div>
            <div className="relative">
              <Link to={"/chat"}>
                <FontAwesomeIcon className="text-main" icon={faComments} />
              </Link>
              {messageAlram && (
                <span className="absolute -top-2 font-bold text-main text-xl">
                  !
                </span>
              )}
            </div>
            <label className="relative">
              <div className="flex items-center gap-1">
                <DropDown
                  openButtonText={openButtonText}
                  dropDownRef={dropDownRef}
                  setIsOpen={setIsOpen}
                />
                <FontAwesomeIcon className="text-main" icon={faCaretDown} />
              </div>
              {isOpen ? (
                <ul className="absolute z-20 bg-sub rounded-[5px] top-14 -left-2 text-center break-keep text-main">
                  <li>
                    <Link to={`/users/${userInfo.userId}`}>
                      <button>마이페이지</button>
                    </Link>
                  </li>
                  <li>
                    <button onClick={logoutHandler}>로그아웃</button>
                  </li>
                </ul>
              ) : null}
            </label>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-7">
          <Link to={"/search"}>
            <FontAwesomeIcon
              className="w-[18px] h-[18px] text-main"
              icon={faMagnifyingGlass}
            />
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
