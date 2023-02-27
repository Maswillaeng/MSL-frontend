import styled from "styled-components";
import basicProfile from "../../assets/basic_thumbnail.png";

const UserListModal = ({ title, setModal }) => {
  const userList = [
    { userId: 1, userImage: "", nickName: "정채운" },
    { userId: 2, userImage: "", nickName: "정채운" },
    { userId: 3, userImage: "", nickName: "정채운" },
    { userId: 4, userImage: "", nickName: "정채운" },
    { userId: 5, userImage: "", nickName: "정채운" },
    { userId: 6, userImage: "", nickName: "정채운" },
    { userId: 7, userImage: "", nickName: "정채운" },
    { userId: 8, userImage: "", nickName: "정채운" },
    { userId: 9, userImage: "", nickName: "정채운" },
    { userId: 10, userImage: "", nickName: "정채운" },
    { userId: 11, userImage: "", nickName: "정채운" },
    { userId: 12, userImage: "", nickName: "정채운" },
    { userId: 13, userImage: "", nickName: "정채운" },
    { userId: 20, userImage: "", nickName: "정채운" },
    { userId: 30, userImage: "", nickName: "정채운" },
    { userId: 40, userImage: "", nickName: "정채운" },
    { userId: 50, userImage: "", nickName: "정채운" },
    { userId: 60, userImage: "", nickName: "정채운" },
    { userId: 70, userImage: "", nickName: "정채운" },
    { userId: 80, userImage: "", nickName: "정채운" },
    { userId: 90, userImage: "", nickName: "정채운" },
    { userId: 100, userImage: "", nickName: "정채운" },
    { userId: 101, userImage: "", nickName: "정채운" },
    { userId: 102, userImage: "", nickName: "정채운" },
  ];
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
