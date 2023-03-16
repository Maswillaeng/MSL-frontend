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
    const newSocket = new WebSocket("ws://localhost:8080/chat");
    newSocket.onopen = () => {
      setSocket(newSocket);
      newSocket.send(JSON.stringify({ type: "ENTER", userId }));
    };
    newSocket.onerror = (error) => {
      setSocket(null);
      console.error("WebSocket error:", error);
    };

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
