import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { checkEmailOverlapFetch } from "../../api/userFetch";
import SignInputContext from "../../context/check-signInput-context";
import { emailRule } from "../../utility/input-rules";
import Input from "../UI/Input";

const EmailInput = ({ emailRef }) => {
  const { info, updateEmailInfo } = useContext(SignInputContext);
  const { emailInfo } = info;
  const { isValid, error } = emailInfo;
  const [errorMessage, setErrorMessage] = useState("");

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
    }
    checkOverlapEmail();
  };

  const checkOverlapEmail = async () => {
    const { value } = emailRef.current;
    try {
      const response = await checkEmailOverlapFetch(value);
      if (response.ok) {
        updateEmailInfo(true, false);
      } else {
        updateEmailInfo(false, true);
        throw new Error("중복된 이메일 입니다.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="relative">
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
    </div>
  );
};

export default EmailInput;
