import { createContext, useReducer } from "react";

const SignInputContext = createContext({
  info: {},
  updateEmailInfo: () => {},
  updatePasswordInfo: () => {},
  updateCheckPasswordInfo: () => {},
  updateNickNameInfo: () => {},
  updatePhoneInfo: () => {},
});

const validReducer = (state, { type, val }) => {
  const copyState = JSON.parse(JSON.stringify(state));

  switch (type) {
    case "EMAIL_CHECK":
      copyState.emailInfo.isValid = val.valid;
      copyState.emailInfo.error = val.error;
      return copyState;
    case "PASSWORD_CHECK":
      copyState.passwordInfo.isValid = val.valid;
      copyState.passwordInfo.error = val.error;
      return copyState;
    case "SEC_PASSWORD_CHECK":
      copyState.checkPasswordInfo.isValid = val.valid;
      copyState.checkPasswordInfo.error = val.error;
      return copyState;
    case "NICK_NAME_CHECK":
      copyState.nickNameInfo.isValid = val.valid;
      copyState.nickNameInfo.error = val.error;
      return copyState;
    case "PHONE_CHECK":
      copyState.phoneInfo.isValid = val.valid;
      copyState.phoneInfo.error = val.error;
      return copyState;
    default:
      return null;
  }
};

export const SignInputProvider = (props) => {
  const [info, dispatchIsValid] = useReducer(validReducer, {
    emailInfo: { isValid: false, error: false },
    passwordInfo: { isValid: false, error: false },
    checkPasswordInfo: { isValid: false, error: false },
    nickNameInfo: { isValid: false, error: false },
    phoneInfo: { isValid: false, error: true },
  });

  const updateEmailInfo = (valid, error) => {
    dispatchIsValid({
      type: "EMAIL_CHECK",
      val: { valid, error },
    });
  };

  const updatePasswordInfo = (valid, error) => {
    dispatchIsValid({
      type: "PASSWORD_CHECK",
      val: { valid, error },
    });
  };

  const updateCheckPasswordInfo = (valid, error) => {
    dispatchIsValid({
      type: "SEC_PASSWORD_CHECK",
      val: { valid, error },
    });
  };

  const updateNickNameInfo = (valid, error) => {
    dispatchIsValid({
      type: "NICK_NAME_CHECK",
      val: { valid, error },
    });
  };

  const updatePhoneInfo = (valid, error) => {
    dispatchIsValid({
      type: "PHONE_CHECK",
      val: { valid, error },
    });
  };
  return (
    <SignInputContext.Provider
      value={{
        info,
        updateEmailInfo,
        updatePasswordInfo,
        updateCheckPasswordInfo,
        updateNickNameInfo,
        updatePhoneInfo,
      }}
    >
      {props.children}
    </SignInputContext.Provider>
  );
};

export default SignInputContext;
