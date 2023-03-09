import { useNavigate } from "react-router-dom";
import Input from "../Components/UI/Input";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import "../styles/input.css";
import { useContext, useRef, useState } from "react";
import UserContext from "../context/user-context";
import Loading from "../Components/Loading";
import { loginFetch } from "../api/userFetch";

const Login = () => {
  const { setIsLoggedIn } = useContext(UserContext);
  const navigation = useNavigate();
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitLoginForm = async (e) => {
    e.preventDefault();
    const { value: idValue } = idRef.current;
    const { value: passwordValue } = passwordRef.current;
    if (idValue === "" || passwordValue === "") {
      setError(true);
      setErrorMessage("아이디 또는 비밀번호를 입력해주세요");
      return;
    }
    setIsLoading(true);
    try {
      await loginFetch(idValue, passwordValue);
      setIsLoggedIn(true);
      navigation("/");
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };
  return (
    <>
      <div className="flex flex-col items-center mt-20">
        <h1
          onClick={() => navigation("/")}
          className="font-bold text-3xl text-main mb-10 cursor-pointer"
        >
          Maswillaeng
        </h1>
        <form onSubmit={submitLoginForm} className="flex flex-col">
          <Input
            inputRef={idRef}
            icon={faEnvelope}
            placeholder="아이디(이메일)"
            type="text"
          />
          <Input
            inputRef={passwordRef}
            icon={faLock}
            placeholder="비밀번호"
            type="password"
          />
          {error && (
            <span className="text-sm text-red-600">{errorMessage}</span>
          )}
          <button className="button" type="submit">
            로그인
          </button>
        </form>
        <div className="text-sm mt-2 flex w-full justify-center gap-5">
          <button
            className="hover:border-b-2 border-black"
            onClick={() => navigation("/sign")}
          >
            회원가입&rarr;
          </button>
          <button
            onClick={() => navigation("/login/account-info-find")}
            className="hover:border-b-2 border-black"
          >
            비밀번호 찾기&rarr;
          </button>
        </div>
      </div>
      {isLoading ? <Loading /> : null}
    </>
  );
};

export default Login;
