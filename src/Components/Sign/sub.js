import { faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { phoneRule } from "../../utility/input-rules";
import Input from "../UI/Input";

const phoneValidation = (value) => {
  if (phoneRule.test(value)) {
    return true;
  } else {
    return false;
  }
};

const PhoneInput = ({
  phoneIsValid,
  setPhoneIsValid,
  phoneError,
  setPhoneError,
  phoneInputRef,
}) => {
  const phoneTouchedInput = () => {
    const { value } = phoneInputRef.current;
    if (phoneValidation(value)) {
      setPhoneIsValid(true);
      setPhoneError(false);
    } else {
      setPhoneError(true);
      setPhoneIsValid(false);
    }
  };

  const certificateUser = () => {
    const { value } = phoneInputRef.current;

    if (!phoneValidation(value)) {
      setPhoneIsValid(false);
      setPhoneError(true);
      return;
    }
    const IMP = window.IMP;
    IMP.init("imp10391932");

    IMP.certification(
      {
        phone: phoneInputRef.current.value,
        merchant_uid: "ORD20180131-0000011",
        m_redirect_url: "{리디렉션 될 URL}",
      },
      (res) => {
        console.log(res);
        if (res.success) {
          setPhoneIsValid(true);
        } else {
        }
      }
    );
  };

  return (
    <>
      <Input
        inputRef={phoneInputRef}
        error={phoneError}
        errorMessage="휴대폰 형식이 아닙니다."
        isValid={phoneIsValid}
        touchedInput={phoneTouchedInput}
        icon={faMobileAlt}
        placeholder="휴대폰 번호"
        id="phone"
        type="tel"
      />
      {phoneIsValid && (
        <button className="mb-5 button" onClick={certificateUser} type="button">
          휴대폰 본인 인증하기
        </button>
      )}
    </>
  );
};

export default PhoneInput;
