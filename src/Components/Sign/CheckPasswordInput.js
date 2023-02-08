import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useContext, useRef } from "react";
import SignInputContext from "../../context/check-signInput-context";
import Input from "../UI/Input";

const CheckPasswordInput = ({ passwordValue }) => {
  const { info, updateCheckPasswordInfo } = useContext(SignInputContext);
  const { checkPasswordInfo } = info;
  const { isValid, error } = checkPasswordInfo;
  const inputRef = useRef(null);
  const touchedInput = () => {
    const { value } = inputRef.current;
    if (passwordValue === value) {
      updateCheckPasswordInfo(true, false);
    } else {
      updateCheckPasswordInfo(false, true);
    }
  };
  return (
    <>
      <Input
        error={error}
        inputRef={inputRef}
        errorMessage="비밀번가 일치하지 않습니다."
        isValid={isValid}
        touchedInput={touchedInput}
        icon={faLock}
        placeholder="비밀번호 확인"
        id="checkingPassword"
        type="password"
      />
    </>
  );
};

export default CheckPasswordInput;
