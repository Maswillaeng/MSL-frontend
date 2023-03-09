import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useContext, useRef, useState } from "react";
import Header from "../Components/Header";
import Input from "../Components/UI/Input";
import SignInputContext from "../context/check-signInput-context";
import { emailRule } from "../utility/input-rules";

const AccountFind = () => {
  const emailRef = useRef(null);
  const { info, updateEmailInfo } = useContext(SignInputContext);
  const { emailInfo } = info;
  const { isValid, error } = emailInfo;
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const touchedInput = () => {
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

  const submitEmailToFindPassword = async (e) => {
    e.preventDefault();
    const { value } = emailRef?.current;
    try {
      const response = await fetch(`http://localhost:8080/api/pwd-reset-mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: value }),
      });
      if (response.ok) {
        updateEmailInfo(true, false);
        setIsSuccess(true);
      } else {
        updateEmailInfo(false, true);
        throw new Error("이메일을 잘못 입력하셨습니다.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center">
        {isSuccess ? (
          <div className="mt-[100px] text-main">
            {emailRef && emailRef?.current?.value}로 비밀번호 재설정 이메일을
            발송하였습니다.
          </div>
        ) : (
          <div className="flex flex-col items-center mt-[100px] border-2 border-main w-[500px] h-[250px]">
            <h1 className="text-main font-bold text-2xl mb-10">
              비밀번호 찾기
            </h1>
            <form
              onSubmit={submitEmailToFindPassword}
              className="w-full flex flex-col items-center"
            >
              <Input
                error={error}
                inputRef={emailRef}
                errorMessage={errorMessage}
                touchedInput={touchedInput}
                isValid={isValid}
                icon={faEnvelope}
                placeholder="아이디(이메일)"
                id="email"
                type="email"
              />
              <button className="button " type="submit">
                비밀번호 찾기
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountFind;
