import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { deletePostFetch } from "../../api/postFetch";
import { changeDateFormat } from "../../utility/chage-format";

const PostHead = ({
  postUserNickName,
  postId,
  postUserImage,
  userInfo,
  isLiked,
  isReported,
  createdAt,
}) => {
  const navigation = useNavigate();
  const menuListRef = useRef(null);

  const showMenu = () => {
    menuListRef.current.classList.toggle("hidden");
  };

  const getModifyPage = () => {
    navigation(`/post/manage/${postId}`);
  };

  const deletePost = async () => {
    const answer = window.confirm("정말로 삭제하시겠습니까?");
    if (answer) {
      await deletePostFetch(postId);
      navigation("/post/page/1");
    } else {
      navigation(`/post/detail/${postId}`);
    }
  };

  return (
    <div className="flex justify-between border-b-2 border-main pb-5">
      <div className="flex">
        <img
          className="max-w-[50px] max-h-[50px] min-w-[50px] min-h-[50px] mr-5 rounded-full bg-center"
          alt="해당 게시물 유저 이미지"
          src={postUserImage}
        />
        <ul>
          <li>{postUserNickName}</li>
          <li>
            {changeDateFormat(createdAt, {
              year: "2-digit",
              month: "long",
              day: "2-digit",
            })}
          </li>
        </ul>
      </div>
      <ul className="mt-3">
        <li className="cursor-pointer relative" onClick={showMenu}>
          <FontAwesomeIcon icon={faEllipsisV} />
          <ul className="hidden absolute w-10 z-20" ref={menuListRef}>
            {userInfo.nickName === postUserNickName ? (
              <>
                <li onClick={getModifyPage}>수정</li>
                <li onClick={deletePost}>삭제</li>
              </>
            ) : null}
            <li>신고</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default PostHead;
