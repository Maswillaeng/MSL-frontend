import { useContext, useEffect, useRef, useState } from "react";
import Header from "../Components/Header";
import SocketContext from "../context/socket-context";
import basicProfile from "../assets/basic_thumbnail.png";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
  const socket = useContext(SocketContext);
  const navigation = useNavigate();
  const [chatList, setChatList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const { userId } = useParams();
  const [findChatUser, setFindChatUser] = useState(null);
  const sendMessageRef = useRef(null);

  useEffect(() => {
    getChatList();
  });

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        if (newMessage.type === "DM") {
          setMessageList((prevList) => {
            return [...prevList, newMessage.data];
          });
        }
      };
    }
  });

  const getChatList = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/chat-list`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      setChatList(data);
      //post로리스트를 추가해주는데 이미 있다면
    }
  };

  const openChattingHandler = (e) => {
    const { id } = e.target.closest(".chatList");
    setFindChatUser(() => {
      const findUser = chatList.find((ele) => ele.userId === userId);
      return findUser;
    });
    navigation(`/chat/${id}`);
  };

  const sendMessage = () => {
    if (sendMessageRef && socket) {
      const newMessage = { type: "DM", data: sendMessageRef?.current.value };
      socket.send(JSON.stringify(newMessage));
      sendMessageRef.current.value = "";
    }
  };

  console.log(messageList);
  return (
    <div>
      <Header />
      <div className="flex justify-center mt-[70px] ">
        <div className="w-[970px] border-2 h-[500px] border-main rounded-[5px] flex">
          <div className="border-r-2 border-main w-[300px] h-full">
            <ul>
              {chatList.map((element) => (
                <li
                  className="chatList"
                  id={element.userId}
                  onClick={openChattingHandler}
                >
                  <div className="flex">
                    <img
                      className="max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] mr-2 rounded-full"
                      alt="해당 댓글 유저이미지"
                      src={element.userImage || basicProfile}
                    />
                    <div className="flex flex-col">
                      <span>{element.nickName}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center px-[40px] border-b-2 border-main basis-[70px]">
              <div>
                <span>{findChatUser?.nickName}hi</span>
              </div>
              <div className="text-main">
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </div>
            </div>
            <div className="grow">{messageList}</div>
            <div className="basis-[100px] border-t-2 border-main flex flex-col p-[20px]">
              <textarea
                ref={sendMessageRef}
                className="outline-none resize-none border-2 border-main rounded-[5px] p-[10px]"
                placeholder="메시지 보내기"
              ></textarea>
              <div className="mt-[10px] text-right flex justify-between">
                <div></div>
                <button
                  onClick={sendMessage}
                  className="button w-10 text-right"
                >
                  전송
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
