import { useContext, useEffect, useRef, useState } from "react";
import Header from "../Components/Header";
import SocketContext from "../context/socket-context";
import basicProfile from "../assets/basic_thumbnail.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../context/user-context";
import { changeDateFormat } from "../utility/chage-format";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Chat = () => {
  const socket = useContext(SocketContext);
  const {
    userInfo: { userId },
  } = useContext(UserContext);
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const messageContainerRef = useRef(null);
  const roomId = searchParams.get("room-id");
  const [opponentInfo, setOpponentInfo] = useState({
    userImage: "",
    nickName: "호호호",
  });
  const [isOpenMessage, setIsOpenMessage] = useState(false);
  const [roomList, setRoomList] = useState([
    {
      chatRoomId: 1,
      nickName: "test",
      userImage: "",
      unReadMsgCnt: 100,
      lastMessage: "고생했어",
      lastMessageTime: "2023-03-14T01:20:56.459073",
    },
    {
      chatRoomId: 2,
      nickName: "test",
      userImage: "",
      unReadMsgCnt: 20,
      lastMessage: "고생했어",
      lastMessageTime: "2023-03-14T01:20:56.459073",
    },
  ]);
  const [messageList, setMessageList] = useState([]);
  const sendMessageRef = useRef(null);

  const getRoomList = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/chat-room/list`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const { data } = await response.json();
      console.log(data);
      setRoomList(data);
    }
  };

  const getMessageList = async () => {
    if (!roomId) return;
    const response = await fetch(
      `http://localhost:8080/api/chat/list/${roomId}`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const { data } = await response.json();
      console.log(data);
      setMessageList(data.chatMessageList);
      setOpponentInfo({
        nickName: data.nickName,
        userImage: data.userImage,
        partnerId: data.partnerId,
      });
    }
  };

  const openChattingHandler = (e) => {
    if (e) {
      const { id } = e.target.closest(".chatList");
      navigation(`/chat?room-id=${id}`);
    }
    if (!roomId) return;
    //소켓을 보낼 필요가 있을까?
    // if (socket) {
    //   socket.send(
    //     JSON.stringify({
    //       type: "ACK",
    //       roomId,
    //       opponentId: opponentInfo?.opponentId,
    //     })
    //   );
    // }
    setRoomList((prevList) => {
      prevList.find((ele) => ele.chatRoomId === +roomId).unReadMsgCnt = 0;
      return [...prevList];
    });
  };

  const sendMessage = () => {
    const { value } = sendMessageRef?.current;
    const chatId = uuidv4();
    const createdAt = Date.now();
    if (sendMessageRef && socket) {
      const newMessage = {
        type: "MESSAGE",
        content: value,
        recipientId: opponentInfo.partnerId,
        senderId: userId,
        createdAt,
        chatId,
      };
      socket.send(JSON.stringify(newMessage));
    }
    setMessageList((prevList) => {
      return [
        ...prevList,
        {
          content: value,
          userId,
          createdAt,
          chatId,
          isRead: false,
        },
      ];
    });
    sendMessageRef.current.value = "";
  };

  useEffect(() => {
    if (socket && !socket.onmessage) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case "DM":
            if (data.userId === userId) return;
            setMessageList((prevList) => {
              return [...prevList, data.messageInfo];
            });
            break;
          case "ACK":
            setMessageList((prevList) => {
              prevList.map((ele) => {
                if (ele.userId === userId) {
                  return { ...ele, isRead: true };
                }
                return { ...ele };
              });
            });
            break;
          default:
            console.log(`Unknown data type: ${data.type}`);
            break;
        }
      };
    }
  }, [roomId, socket, userId]);

  useEffect(() => {
    openChattingHandler();
    getMessageList();
  }, [roomId]);

  useEffect(() => {
    getRoomList();
  }, [userId]);

  useEffect(() => {
    if (!roomId) return;
    if (messageContainerRef) {
      const container = messageContainerRef.current;
      container.scrollTop = container?.scrollHeight;
    }
  }, [messageContainerRef.current?.scrollHeight, roomId]);
  return (
    <div>
      <Header />
      <div className="flex justify-center mt-[40px] ">
        <div className="w-[970px] border-2 h-[600px] border-main rounded-[5px] flex">
          <div className="border-r-2 border-main w-[300px] h-full">
            <RoomList className="overflow-y-auto h-full">
              {roomList.map((element) => (
                <li
                  key={element.chatRoomId}
                  className={`chatList h-[70px] border-b-2 border-main flex items-center px-4 hover:bg-sub hover:cursor-pointer ${
                    +roomId === element.chatRoomId ? "bg-sub" : null
                  }`}
                  id={element.chatRoomId}
                  onClick={openChattingHandler}
                >
                  <div className="flex w-full">
                    <img
                      className="basis-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] mr-2 rounded-full"
                      alt="해당 댓글 유저이미지"
                      src={element.userImage || basicProfile}
                    />
                    <div className="flex flex-col grow ">
                      <span className="one-line-ellipsis w-[90px]">
                        {element.nickName}
                      </span>
                      <span className="one-line-ellipsis w-[90px] text-[10px] text-gray-500">
                        {element.lastMessage}
                      </span>
                    </div>
                    <div className="flex flex-col text-[10px] pt-1 gap-1 items-center">
                      <span>
                        {element.lastMessageTime &&
                          changeDateFormat(element.lastMessageTime, {})}
                      </span>
                      <span className="text-sub">
                        {element.unReadMsgCnt === 0 ? null : (
                          <span className="px-2 bg-main rounded-[10px]">
                            {element.unReadMsgCnt}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </RoomList>
          </div>
          <div className="flex flex-col w-full">
            {searchParams.get("room-id") ? (
              <>
                <div className="flex justify-between items-center px-[40px] border-b-2 border-main basis-[70px]">
                  <div>
                    <span className="font-bold">{opponentInfo.nickName}</span>
                  </div>
                </div>
                <MessageContainer
                  ref={messageContainerRef}
                  className="grow px-10 py-3 overflow-y-auto"
                >
                  {messageList.map((ele) =>
                    ele.userId === +userId ? (
                      <div
                        key={ele.chatId}
                        className="flex flex-row-reverse mt-3 ml-[100px]"
                      >
                        <div className="bg-main text-sub px-3 rounded-[5px] break-all w-auto">
                          {ele?.content.length > 100 ? (
                            <>
                              <div className="break-all">
                                {isOpenMessage
                                  ? ele.content
                                  : `${ele.content.slice(0, 99)}...`}
                              </div>
                              <button
                                onClick={() =>
                                  setIsOpenMessage((prev) => !prev)
                                }
                                className="text-sm"
                              >
                                {isOpenMessage ? "간략히" : "펼치기"}
                              </button>
                            </>
                          ) : (
                            ele.content
                          )}
                        </div>
                        <div className="text-[10px] break-keep w-[70px] min-w-[70px] self-end">
                          {changeDateFormat(ele.createdAt, {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </div>
                        <div className="text-[10px] self-end mr-1">
                          {ele.isRead ? "읽음" : "안읽음"}
                        </div>
                      </div>
                    ) : (
                      <div key={ele.chatId} className="flex mt-3 mr-[100px]">
                        <img
                          className="basis-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] mr-2 rounded-full"
                          src={opponentInfo.userImage || basicProfile}
                          alt="유저 이미지"
                        />
                        <div>
                          <span className="font-bold">
                            {opponentInfo.nickName}
                          </span>
                          <div className="bg-sub text-main px-3 rounded-[5px] break-all w-auto">
                            {ele?.content.length > 100 ? (
                              <>
                                <div className="break-all">
                                  {isOpenMessage
                                    ? ele.content
                                    : `${ele.content.slice(0, 99)}...`}
                                </div>
                                <button
                                  onClick={() =>
                                    setIsOpenMessage((prev) => !prev)
                                  }
                                  className="text-sm"
                                >
                                  {isOpenMessage ? "간략히" : "펼치기"}
                                </button>
                              </>
                            ) : (
                              ele.content
                            )}
                          </div>
                        </div>
                        <div className="text-[10px] break-keep w-[70px] min-w-[70px] self-end text-right">
                          {changeDateFormat(ele.createdAt, {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </div>
                      </div>
                    )
                  )}
                </MessageContainer>
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
              </>
            ) : (
              <div className="flex h-full justify-center items-center">
                <span>대화 상대를 지정하고 대화를 시작해보세요</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const RoomList = styled.ul`
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    width: 5px;
    background-color: #f9e6eb;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #aa233c;
    border-radius: 5px;
  }
`;

const MessageContainer = styled(RoomList)``;

export default Chat;
