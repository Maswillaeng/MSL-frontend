import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUserFetch } from "../../api/userFetch";
import UserContext from "../../context/user-context";
import basicProfile from "../../assets/basic_thumbnail.png";
import UserListModal from "./UserListModal";
import { createPortal } from "react-dom";
import { formatNumber } from "../../utility/chage-format";
import { changeFollowStateFetch } from "../../api/followFetch";

const UserIntroduction = ({
  userImage,
  nickName,
  introduction,
  setModal,
  followerCnt,
  followingCnt,
  followState,
  setFollowState,
  postNumber,
}) => {
  const { userInfo, isLoggedIn } = useContext(UserContext);
  const navigation = useNavigate();
  const { userId } = useParams();
  const [followerListModal, setFollowerListModal] = useState(false);
  const [followingListModal, setFollowingListModal] = useState(false);

  const deleteUserHandler = async () => {
    const answer = window.confirm("정말로 탈퇴하시겠습니까?");
    if (answer) {
      await deleteUserFetch(userId);
      navigation("/");
    } else {
      navigation(`/users/${userId}`);
    }
  };

  const clickEditProfile = () => {
    setModal(true);
  };

  const followUser = async () => {
    if (!isLoggedIn) {
      alert("로그인을 해주세요");
    }
    if (followState) {
      await toggleFollow("DELETE", false);
    } else {
      await toggleFollow("POST", true);
    }
  };

  const toggleFollow = async (method, state) => {
    const returnValue = await changeFollowStateFetch(method, userId);
    if (returnValue) {
      setFollowState(state);
    }
  };

  const showFollowerListModal = () => {
    if (followerCnt === 0) return;
    setFollowerListModal(true);
  };

  const showFollowListModal = () => {
    if (followingCnt === 0) return;
    setFollowingListModal(true);
  };
  return (
    <>
      <div className="mb-10">
        {userInfo.nickName === nickName ? (
          <div className="absolute right-0 flex gap-5">
            <button onClick={clickEditProfile} className="button">
              프로필 수정
            </button>
            <button className="button" onClick={deleteUserHandler}>
              회원 탈퇴
            </button>
          </div>
        ) : (
          <div className="absolute right-0 flex gap-5">
            <button
              onClick={followUser}
              className={`${followState ? "target-button" : "button"}`}
            >
              {followState ? "팔로잉" : "팔로우"}
            </button>
          </div>
        )}
        <div className="flex ml-[200px] text-main mb-10">
          <img
            alt="유저 이미지"
            src={userImage ? `${userImage}` : basicProfile}
            className="max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px] mr-5 object-cover object-center rounded-full"
          />
          <ul>
            <li className="text-2xl font-bold">{nickName}</li>
            <li>{introduction}</li>
          </ul>
        </div>
        <div className="flex justify-center">
          <ul className="flex justify-evenly border-y-2 border-main text-main w-3/5">
            <li className="flex flex-col text-center">
              <span>게시물</span>
              <span>{formatNumber({ notation: "compact" }, postNumber)}</span>
            </li>
            <li
              onClick={showFollowerListModal}
              className="flex flex-col text-center cursor-pointer"
            >
              <span>팔로워</span>
              <span>{formatNumber({ notation: "compact" }, followerCnt)}</span>
            </li>
            <li
              onClick={showFollowListModal}
              className="flex flex-col text-center cursor-pointer"
            >
              <span>팔로잉</span>
              <span>{formatNumber({ notation: "compact" }, followingCnt)}</span>
            </li>
          </ul>
        </div>
      </div>
      {followerListModal
        ? createPortal(
            <UserListModal
              id="follower"
              title="팔로워"
              setModal={setFollowerListModal}
            />,
            document.getElementById("modal")
          )
        : null}
      {followingListModal
        ? createPortal(
            <UserListModal
              id="following"
              title="팔로잉"
              setModal={setFollowingListModal}
            />,
            document.getElementById("modal")
          )
        : null}
    </>
  );
};

export default UserIntroduction;
