import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { updateCommentLikeNumberFetch } from "../../api/postFetch";
import UserContext from "../../context/user-context";
import useFindOpenBarAndClose from "../../hooks/useFindOpenBarAndClose";
import useToggleLike from "../../hooks/useToggleLike";
import { changeDateFormat } from "../../utility/chage-format";
import DropDown from "../UI/DropDown";

const menuButtonText = ` <svg fill="#AA233C" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
    <path d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z" />
  </svg>`;

const CommentList = ({ ele, basicProfile }) => {
  const { isLoggedIn, userInfo } = useContext(UserContext);
  const { isLike, likeCount, toggleLike } = useToggleLike(
    isLoggedIn,
    ele.like,
    ele.liked,
    updateCommentLikeNumberFetch,
    ele.commentId
  );
  const commentRef = useRef(null);
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useFindOpenBarAndClose(dropDownRef, false);
  const [editMode, setEditMode] = useState(false);

  const toggleCommentLike = () => {
    toggleLike();
  };

  const editComment = () => {
    setEditMode((prev) => !prev);
  };

  const deleteComment = async () => {
    const response = await fetch(
      `http://localhost:8080/api/comment/${ele.commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    console.log(response);
  };

  const submitComment = async (e) => {
    e.preventDefault();

    const { value } = commentRef?.current;
    const response = await fetch(`http://localhost:8080/api/comment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId: ele.commentId, content: value }),
      credentials: "include",
    });
    setEditMode(false);
  };

  return (
    <li className="flex justify-between mb-5">
      {editMode ? (
        <form
          className="flex flex-col justify-between mt-10 w-full"
          onSubmit={submitComment}
        >
          <div className="flex">
            <img
              className="max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] mr-2 rounded-full"
              alt="사용자 프로필 이미지"
              src={userInfo.userImage || basicProfile}
            />
            <textarea
              ref={commentRef}
              defaultValue={ele.content}
              id="comment"
              className="border-b-2 border-main outline-none resize-none w-full h-auto overflow-auto"
              placeholder="댓글 입력"
            ></textarea>
          </div>
          <div className="flex gap-5 self-end m-5">
            <button
              onClick={() => setEditMode(false)}
              id="addCommentButton"
              type="button"
              className="button"
            >
              취소
            </button>
            <button id="addCommentButton" type="submit" className="button">
              저장
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex">
            <Link to={`/users/${ele.userId}`}>
              <img
                className="max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] mr-2 rounded-full"
                alt="해당 댓글 유저이미지"
                src={ele.userImage || basicProfile}
              />
            </Link>
            <div className="flex flex-col">
              <ul className="flex gap-3">
                <li className="text-[5px]">{ele.nickName}</li>
                <li className="text-[5px]">
                  {changeDateFormat(ele.createAt, {
                    year: "2-digit",
                    month: "long",
                    day: "2-digit",
                  })}
                </li>
              </ul>
              <div>{ele.content}</div>
              <div>
                <div>
                  <FontAwesomeIcon
                    id="commentLike"
                    onClick={toggleCommentLike}
                    icon={faHeart}
                    className={`mr-2 cursor-pointer ${
                      isLike ? "" : "text-white"
                    }  stroke-[10px] stroke-main`}
                  />
                  <span>{likeCount}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            {userInfo.nickName === ele.nickName ? (
              <label className="relative" htmlFor="sortComment">
                <DropDown
                  openButtonText={menuButtonText}
                  dropDownRef={dropDownRef}
                  setIsOpen={setIsOpen}
                />
                {isOpen ? (
                  <ul className="absolute z-20 bg-sub rounded-[5px] top-8 -left-1 text-center break-keep">
                    {userInfo.nickName === ele.nickName ? (
                      <>
                        <li className="pointer" onClick={editComment}>
                          수정
                        </li>
                        <li className="pointer" onClick={deleteComment}>
                          삭제
                        </li>
                      </>
                    ) : null}
                  </ul>
                ) : null}
              </label>
            ) : null}
          </div>
        </>
      )}
    </li>
  );
};

export default CommentList;
