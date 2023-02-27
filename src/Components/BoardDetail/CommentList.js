import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  deleteCommentFetch,
  editCommentFetch,
  updateCommentLikeNumberFetch,
} from "../../api/postFetch";
import PostContext from "../../context/post-context";
import UserContext from "../../context/user-context";
import useFindOpenBarAndClose from "../../hooks/useFindOpenBarAndClose";
import useToggleLike from "../../hooks/useToggleLike";
import { changeDateFormat } from "../../utility/chage-format";
import DropDown from "../UI/DropDown";

const menuButtonText = ` <svg fill="#AA233C" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
    <path d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z" />
  </svg>`;

const CommentList = ({ element, basicProfile }) => {
  const { isLoggedIn, userInfo } = useContext(UserContext);
  const {
    updateCommentContent,
    deleteComment: deletePostComment,
    updateCommentLikeInfo,
  } = useContext(PostContext);
  const { toggleLike } = useToggleLike(
    isLoggedIn,
    element.like,
    element.liked,
    updateCommentLikeNumberFetch,
    element.commentId,
    updateCommentLikeInfo
  );
  const commentRef = useRef(null);
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useFindOpenBarAndClose(dropDownRef, false);
  const [editMode, setEditMode] = useState(false);
  const [isOpenComment, setIsOpenComment] = useState(false);

  const toggleCommentLike = () => {
    toggleLike();
  };

  const editComment = () => {
    setEditMode((prev) => !prev);
  };

  const deleteComment = async () => {
    const answer = window.confirm("정말로 삭제하시겠습니까?");
    if (answer) {
      const response = await deleteCommentFetch(element.commentId);
      if (response.ok) {
        deletePostComment(element.commentId);
      }
    } else {
      return;
    }
    setEditMode(false);
  };

  const toggleCommentBox = () => {
    setIsOpenComment((prev) => !prev);
  };

  const submitComment = async (e) => {
    e.preventDefault();

    const { value } = commentRef?.current;
    if (value === "") {
      await deleteComment();
      return;
    }

    const response = await editCommentFetch(value, element.commentId);
    if (response.ok) {
      updateCommentContent(element.commentId, value);
    }
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
              defaultValue={element.content}
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
            <Link to={`/users/${element.userId}`}>
              <img
                className="max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] mr-2 rounded-full"
                alt="해당 댓글 유저이미지"
                src={element.userImage || basicProfile}
              />
            </Link>
            <div className="flex flex-col">
              <ul className="flex gap-3">
                <li className="text-[5px]">{element.nickName}</li>
                <li className="text-[5px]">
                  {changeDateFormat(element.createAt, {
                    year: "2-digit",
                    month: "long",
                    day: "2-digit",
                  })}
                </li>
              </ul>
              <div>
                {element?.content.length > 150 ? (
                  <>
                    <div className="break-all">
                      {isOpenComment
                        ? element.content
                        : `${element.content.slice(0, 149)}...`}
                    </div>
                    <button onClick={toggleCommentBox} className="text-sm">
                      {isOpenComment ? "간략히" : "펼치기"}
                    </button>
                  </>
                ) : (
                  element.content
                )}
              </div>
              <div>
                <div>
                  <FontAwesomeIcon
                    id="commentLike"
                    onClick={toggleCommentLike}
                    icon={faHeart}
                    className={`mr-2 cursor-pointer ${
                      element.liked ? "" : "text-white"
                    }  stroke-[10px] stroke-main`}
                  />
                  <span>{element.like}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            {userInfo.nickName === element.nickName ? (
              <label className="relative" htmlFor="sortComment">
                <DropDown
                  openButtonText={menuButtonText}
                  dropDownRef={dropDownRef}
                  setIsOpen={setIsOpen}
                />
                {isOpen ? (
                  <ul className="absolute z-20 bg-sub rounded-[5px] top-8 -left-1 text-center break-keep">
                    {userInfo.nickName === element.nickName ? (
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

const Ellipsis = styled.span`
  overflow: hidden;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export default CommentList;
