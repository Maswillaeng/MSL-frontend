import { createContext, useState } from "react";

const LoginContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const LoginProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginContext value={{ isLoggedIn, setIsLoggedIn }}>
      {props.children}
    </LoginContext>
  );
};

export default LoginContext;
