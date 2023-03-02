import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import basicProfile from "../../assets/basic_thumbnail.png";

const UserListModal = ({ title, setModal, id }) => {
  const [userList, setUserList] = useState([]);
  const { userId } = useParams();

  const getFollowerOrFollowingData = async () => {
    if (id === "follower") {
      const response = await fetch(
        `http://localhost:8080/api/followerList/${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setUserList(data);
      }
    } else {
      const response = await fetch(
        `http://localhost:8080/api/followingList/${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setUserList(data);
      }
    }
  };

  useEffect(() => {
    getFollowerOrFollowingData();
  }, []);
  return (
    <div
      onClick={(e) => {
        if (!e.target.closest(".modal")) {
          setModal(false);
        }
      }}
      className="flex justify-center items-center  bg-[rgba(0,0,0,0.3)] absolute top-0 w-full h-full z-50"
    >
      <div className="modal flex flex-col items-center w-[350px] h-[400px] border-2 border-main bg-sub rounded-[10px] pt-5 relative">
        <h1 className="mb-5">{title}</h1>
        <UserList>
          {userList.map((ele) => (
            <li className="flex items-center ml-10 gap-3" key={ele.userId}>
              <img
                className="w-[40px] h-[40px] rounded-full"
                alt="유저 이미지"
                src={ele.userImage || basicProfile}
              />
              <span>{ele.nickName}</span>
            </li>
          ))}
        </UserList>
        <button
          onClick={() => setModal(false)}
          className="absolute top-3 right-5"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

const UserList = styled.ul`
  overflow-y: scroll;
  width: 100%;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 5px;
  }
  scroll-behavior: smooth;
`;

export default UserListModal;
