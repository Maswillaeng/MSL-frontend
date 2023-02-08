import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import SignInputContext from "../../context/check-signInput-context";
import { passwordRule } from "../../utility/input-rules";

const passwordCheck1 = (value) => {
  return passwordRule.test(value);
};
const passwordCheck2 = (value) => {
  return !/(.)\1\1/.test(value);
};

const PasswordInput = ({ getPasswordValue }) => {
  const { info, updatePasswordInfo } = useContext(SignInputContext);
  const { passwordInfo } = info;
  const { error } = passwordInfo;
  const [passwordValue, setPasswordValue] = useState("");
  const [firstCheck, setFirstCheck] = useState(false);
  const [secondCheck, setSecondCheck] = useState(true);

  const passwordChangeInput = (e) => {
    const { value } = e.target;
    setPasswordValue(value);

    if (passwordCheck1(value)) {
      setFirstCheck(true);
    } else {
      setFirstCheck(false);
    }

    if (passwordCheck2(value)) {
      setSecondCheck(true);
    } else {
      setSecondCheck(false);
    }
  };

  useEffect(() => {
    const passwordValidation = () => {
      if (firstCheck && secondCheck) {
        updatePasswordInfo(true, false);
      } else {
        updatePasswordInfo(false, true);
      }
    };
    passwordValidation();
  }, [firstCheck, secondCheck]);

  return (
    <div className="mb-[10px]">
      <label
        htmlFor="password"
        className="flex items-center w-[450px] border-2 border-main "
      >
        <FontAwesomeIcon
          className="flex justify-center items-center w-[30px] h-[30px] border-2 border-r-main  text-main p-2 "
          icon={faLock}
        />
        <input
          onBlur={(e) => getPasswordValue(e.target.value)}
          value={passwordValue}
          onChange={passwordChangeInput}
          autoComplete="off"
          placeholder="비밀번호"
          className="ml-[14px] w-[378px] h-[28px] py-[10px] border-0 outline-none text-base"
          type="password"
          id="password"
        />
      </label>
      {error && (
        <div className="flex flex-col">
          <span
            className={`text-sm  ${
              firstCheck ? "text-green-600" : "text-red-600"
            }`}
          >
            영문/숫자/특수문자 각 1개 이상 포함 (6~20자)
          </span>
          <span
            className={`text-sm ${
              secondCheck ? "text-green-600" : "text-red-600"
            }`}
          >
            {" "}
            3번 이상 연속되는 동일한 문자/숫자 제외
          </span>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
