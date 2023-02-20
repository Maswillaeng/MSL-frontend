import { useContext } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deletePostFetch } from "../../api/postFetch";
import UserContext from "../../context/user-context";
import useFindOpenBarAndClose from "../../hooks/useFindOpenBarAndClose";
import { changeDateFormat } from "../../utility/chage-format";
import DropDown from "../UI/DropDown";

const menuButtonText = ` <svg fill="#AA233C" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
    <path d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z" />
  </svg>`;

const PostHead = ({
  postUserNickName,
  postId,
  postUserImage,
  userInfo,
  postUserId,
  isReported,
  createdAt,
}) => {
  const navigation = useNavigate();
  const { isLoggedIn } = useContext(UserContext);
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useFindOpenBarAndClose(dropDownRef, false);

  const getModifyPage = () => {
    navigation(`/post/manage/${postId}`);
  };

  const deletePost = async () => {
    const answer = window.confirm("정말로 삭제하시겠습니까?");
    if (answer) {
      await deletePostFetch(postId);
      navigation("/");
    } else {
      navigation(`/post/detail/${postId}`);
    }
  };
  return (
    <div className="flex justify-between border-b-2 border-main pb-5">
      <div className="flex">
        <Link to={`/users/${postUserId}`}>
          <img
            className="max-w-[50px] max-h-[50px] min-w-[50px] min-h-[50px] mr-5 rounded-full bg-center"
            alt="해당 게시물 유저 이미지"
            src={postUserImage}
          />
        </Link>
        <ul>
          <li>
            <Link to={`/users/${postUserId}`}>{postUserNickName}</Link>
          </li>
          <li>
            {changeDateFormat(createdAt, {
              year: "2-digit",
              month: "long",
              day: "2-digit",
            })}
          </li>
        </ul>
      </div>
      {isLoggedIn ? (
        <div className="mt-3">
          <label className="relative" htmlFor="sortComment">
            <DropDown
              openButtonText={menuButtonText}
              dropDownRef={dropDownRef}
              setIsOpen={setIsOpen}
            />
            {isOpen ? (
              <ul className="absolute z-20 bg-sub rounded-[5px] top-8 -left-1 text-center break-keep">
                {userInfo.nickName === postUserNickName ? (
                  <>
                    <li className="pointer" onClick={getModifyPage}>
                      수정
                    </li>
                    <li className="pointer" onClick={deletePost}>
                      삭제
                    </li>
                  </>
                ) : null}
                <li className="pointer">신고</li>
              </ul>
            ) : null}
          </label>
        </div>
      ) : null}
    </div>
  );
};

export default PostHead;
