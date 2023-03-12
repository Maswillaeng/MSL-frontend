import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import UserContext from "./user-context";

const SocketContext = createContext(null);

export const SocketProvider = (props) => {
  const [socket, setSocket] = useState(null);
  const {
    isLoggedIn,
    userInfo: { userId },
  } = useContext(UserContext);

  useEffect(() => {
    if (!isLoggedIn) {
      setSocket(null);
      return;
    }
    console.log(userId);
    const newSocket = new WebSocket("ws://localhost:8080/ws");
    newSocket.onopen = () => {
      newSocket.send(userId);
    };
    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [isLoggedIn, userId]);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
