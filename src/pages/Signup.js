import EmailInput from "../Components/Sign/EmailInput";
import PasswordInput from "../Components/Sign/PasswordInput";
import CheckPasswordInput from "../Components/Sign/CheckPasswordInput";
import NickNameInput from "../Components/Sign/NickNameInput";
import PhoneInput from "../Components/Sign/PhoneInput";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInputContext from "../context/check-signInput-context";
import { userSignFetch } from "../api/userFetch";

const Signup = () => {
  const navigation = useNavigate();

  const {
    info,
    updateEmailInfo,
    updatePasswordInfo,
    updateCheckPasswordInfo,
    updateNickNameInfo,
    updatePhoneInfo,
  } = useContext(SignInputContext);
  const {
    emailInfo,
    passwordInfo,
    checkPasswordInfo,
    nickNameInfo,
    phoneInfo,
  } = info;

  const emailRef = useRef(null);
  const nickNameRef = useRef(null);
  const [passwordValue, setPasswordValue] = useState("");

  const getPasswordValue = (value) => {
    setPasswordValue(value);
  };

  const formIsValid =
    emailInfo.isValid &&
    passwordInfo.isValid &&
    checkPasswordInfo.isValid &&
    nickNameInfo.isValid &&
    phoneInfo.isValid;

  const submitUserInfo = async (e) => {
    e.preventDefault();
    const { vlaue: emailValue } = emailRef.current;
    const { value: nickNameValue } = nickNameRef.current;
    if (!formIsValid) {
      if (!phoneInfo.isValid) {
        updatePhoneInfo(false, true);
        e.target[4].focus();
      }
      if (!nickNameInfo.isValid) {
        updateNickNameInfo(false, true);
        e.target[3].focus();
      }
      if (!checkPasswordInfo.isValid) {
        updateCheckPasswordInfo(false, true);
        e.target[2].focus();
      }
      if (!passwordInfo.isValid) {
        e.target[1].focus();
        updatePasswordInfo(false, true);
      }
      if (!emailInfo.isValid) {
        e.target[0].focus();
        updateEmailInfo(false, true);
      }
      return;
    }

    try {
      const response = await userSignFetch(
        emailValue,
        nickNameValue,
        passwordValue
      );
      if (response.ok) {
        navigation("/login");
      } else {
        throw new Error("알 수 없는 에러");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center mt-20">
      <h1
        onClick={() => navigation("/")}
        className="font-bold text-3xl text-main mb-10 cursor-pointer"
      >
        Maswillaeng
      </h1>
      <form onSubmit={submitUserInfo} className="flex flex-col">
        <EmailInput emailRef={emailRef} />
        <PasswordInput getPasswordValue={getPasswordValue} />
        <CheckPasswordInput passwordValue={passwordValue} />
        <NickNameInput inputRef={nickNameRef} />
        <PhoneInput />
        <button className="button" type="submit">
          가입하기
        </button>
      </form>
    </div>
  );
};

export default Signup;
