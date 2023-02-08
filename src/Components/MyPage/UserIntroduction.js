import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUserFetch } from "../../api/userFetch";
import UserContext from "../../context/user-context";

const UserIntroduction = ({ userImage, nickName, introduction, setModal }) => {
  const { userInfo } = useContext(UserContext);
  const navigation = useNavigate();
  const { userId } = useParams();

  const clickEditProfile = () => {
    setModal(true);
  };

  const deleteUserHandler = async () => {
    const answer = window.confirm("정말로 탈퇴하시겠습니까?");
    if (answer) {
      await deleteUserFetch(userId);
      navigation("/");
    } else {
      navigation(`/users/${userId}`);
    }
  };
  return (
    <div className="mb-10">
      <div className="absolute right-0 flex gap-5">
        <button onClick={clickEditProfile} className="button">
          프로필 수정
        </button>
        {userInfo.nickName === nickName ? (
          <button className="button" onClick={deleteUserHandler}>
            회원 탈퇴
          </button>
        ) : null}
      </div>
      <div className="flex">
        <img
          alt="유저 이미지"
          src={userImage ? `${userImage}` : `/img/basic_profile.jpg`}
          className="max-w-[50px] max-h-[50px] min-w-[50px] min-h-[50px] mr-5 object-cover object-center rounded-full"
        />
        <ul>
          <li>닉네임: {nickName}</li>
          <li>{`소개 글: ${introduction}`}</li>
        </ul>
      </div>
    </div>
  );
};

export default UserIntroduction;
