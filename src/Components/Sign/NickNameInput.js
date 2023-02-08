import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { checkNickNameOverlapFetch } from "../../api/userFetch";
import SignInputContext from "../../context/check-signInput-context";
import { nickNameRule } from "../../utility/input-rules";
import Input from "../UI/Input";

const NickNameInput = ({ inputRef }) => {
  const { info, updateNickNameInfo } = useContext(SignInputContext);
  const { nickNameInfo } = info;
  const { isValid, error } = nickNameInfo;
  const [errorMessage, setErrorMessage] = useState("");

  const touchedInput = () => {
    const { value } = inputRef.current;

    if (value === "") {
      setErrorMessage("닉네임을 입력하세요");
      updateNickNameInfo(false, true);
      return;
    } else if (!nickNameRule.test(value)) {
      setErrorMessage("닉네임 형식이 올바르지 않습니다.");
      updateNickNameInfo(false, true);
      return;
    }

    checkOverlapNickName();
  };
  const checkOverlapNickName = async () => {
    const { value } = inputRef.current;
    try {
      const response = await checkNickNameOverlapFetch(value);
      if (response.ok) {
        updateNickNameInfo(true, false);
      } else {
        updateNickNameInfo(false, true);
        throw new Error("중복된 넥네임 입니다.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return (
    <div className="relative">
      <Input
        error={error}
        inputRef={inputRef}
        errorMessage={errorMessage}
        isValid={isValid}
        touchedInput={touchedInput}
        icon={faUser}
        placeholder="닉네임"
        id="name"
        type="text"
      />
    </div>
  );
};

export default NickNameInput;
