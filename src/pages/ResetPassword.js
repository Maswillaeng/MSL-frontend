import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../Components/Header";
import PasswordInput from "../Components/Sign/PasswordInput";
import Input from "../Components/UI/Input";
import SignInputContext from "../context/check-signInput-context";
import { emailRule } from "../utility/input-rules";

const ResetPassword = () => {
  const { info, updateEmailInfo, updateCheckPasswordInfo } =
    useContext(SignInputContext);
  const { emailInfo, checkPasswordInfo } = info;
  const { isValid: emailIsValid, error: emailError } = emailInfo;
  const { isValid: checkPasswordIsValid, error: checkPasswordError } =
    checkPasswordInfo;
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef(null);
  const checkPasswordRef = useRef(null);
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();

  const touchedEmail = () => {
    const { value } = emailRef.current;

    if (value === "") {
      updateEmailInfo(false, true);
      setErrorMessage("이메일을 입력해주세요");
      return;
    } else if (!emailRule.test(value)) {
      updateEmailInfo(false, true);
      setErrorMessage("이메일 형식이 올바르지 않습니다.");
      return;
    } else {
      updateEmailInfo(true, false);
    }
  };

  const touchedCheckPassword = () => {
    const { value } = checkPasswordRef.current;
    if (password === value) {
      updateCheckPasswordInfo(true, false);
    } else {
      updateCheckPasswordInfo(false, true);
    }
  };

  const submitchangePassword = async (e) => {
    e.preventDefault();
    const { value } = emailRef?.current;

    try {
      const response = await fetch(`http://localhost:8080/api/user/reset-pwd`, {
        method: "PUT",
        headers: {
          "Content-Type": "application-json",
        },
        body: JSON.stringify({
          email: value,
          password,
          token: searchParams.get("token"),
        }),
      });
      if (!response.ok) {
        throw new Error("에러");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getPasswordValue = (value) => {
    setPassword(value);
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center">
        <div className="flex flex-col items-center mt-[100px] border-2 border-main w-[500px] h-[330px]">
          <span className="text-main font-bold mb-5">
            새 비밀번호를 입력해주세요
          </span>
          <form
            onSubmit={submitchangePassword}
            className="w-full flex flex-col items-center"
          >
            <Input
              error={emailError}
              inputRef={emailRef}
              errorMessage={errorMessage}
              touchedInput={touchedEmail}
              isValid={emailIsValid}
              icon={faEnvelope}
              placeholder="아이디(이메일)"
              id="email"
              type="email"
            />
            <PasswordInput getPasswordValue={getPasswordValue} />
            <Input
              error={checkPasswordError}
              inputRef={checkPasswordRef}
              errorMessage="비밀번가 일치하지 않습니다."
              isValid={checkPasswordIsValid}
              touchedInput={touchedCheckPassword}
              icon={faLock}
              placeholder="비밀번호 확인"
              id="checkingPassword"
              type="password"
            />
            <button className="button " type="submit">
              확인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
