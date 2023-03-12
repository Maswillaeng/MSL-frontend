import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  createRecommentFetch,
  getRecommentFetch,
} from "../../api/commentFetch";
import {
  deleteCommentFetch,
  editCommentFetch,
  getPostDetailFetch,
  updateCommentLikeNumberFetch,
} from "../../api/postFetch";
import PostContext from "../../context/post-context";
import UserContext from "../../context/user-context";
import useComment from "../../hooks/useComment";
import useFindOpenBarAndClose from "../../hooks/useFindOpenBarAndClose";
import useToggleLike from "../../hooks/useToggleLike";
import { changeDateFormat } from "../../utility/chage-format";
import DropDown from "../UI/DropDown";
import AddComment from "./AddComment";
import CommentInfo from "./CommentInfo";
import EditComment from "./EditComment";
import Recomment from "./Recomment";

const menuButtonText = ` <svg fill="#AA233C" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
    <path d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z" />
  </svg>`;

const recommentReducer = (state, { type, val }) => {
  const copyState = JSON.parse(JSON.stringify(state));
  switch (type) {
    case "UPDATE_RECOMMENT_LIST":
      return [...val];
    case "UPDATE_COMMENT_LIKE":
      const newLikeArray = copyState.map((ele) => {
        if (ele.commentId === val.commentId) {
          ele.like = val.likeNumber;
          ele.isLiked = val.isLiked;
        }
        return ele;
      });
      return newLikeArray;
    case "UPDATE_COMMENT_CONTENT":
      const newArray = copyState.map((ele) => {
        if (ele.commentId === val.commentId) {
          ele.content = val.value;
        }
        return ele;
      });
      return newArray;
    case "DELETE_COMMENT":
      const findIndex = copyState.findIndex((ele) => ele.commentId === val);
      copyState.splice(findIndex, 1);
      return copyState;
    default:
      return null;
  }
};

const CommentList = ({ element, basicProfile, postId }) => {
  const { isLoggedIn, userInfo } = useContext(UserContext);
  const { updateCommentLikeInfo, getPostInfo, dispatchPostInfo } =
    useContext(PostContext);
  const commentRef = useRef(null);
  const dropDownRef = useRef(null);
  const { toggleLike } = useToggleLike(
    isLoggedIn,
    element.like,
    element.isLiked,
    updateCommentLikeNumberFetch,
    element.commentId,
    updateCommentLikeInfo
  );
  const {
    deleteComment,
    editComment,
    editMode,
    isOpenComment,
    setEditMode,
    submitEditComment,
    toggleCommentBox,
    toggleCommentLike,
  } = useComment(toggleLike, dispatchPostInfo, element, commentRef);

  const [isOpen, setIsOpen] = useFindOpenBarAndClose(dropDownRef, false);
  const [isOpenAddComment, setIsOpenAddComment] = useState(false);
  const [isOpenRecomment, setIsOpenRecomment] = useState(false);
  const [recommentList, dispatchRecommentList] = useReducer(
    recommentReducer,
    []
  );

  const updateRecommentLikeInfo = (likeNumber, isLiked, commentId) => {
    dispatchRecommentList({
      type: "UPDATE_COMMENT_LIKE",
      val: { likeNumber, isLiked, commentId },
    });
  };

  const addComment = () => {
    setIsOpenAddComment((prev) => !prev);
  };

  const submitCommentFn = async (value) => {
    try {
      const response = await createRecommentFetch(element.commentId, value);

      if (response.ok) {
        const data = await getRecommentFetch(element.commentId);
        dispatchRecommentList({
          type: "UPDATE_RECOMMENT_LIST",
          val: data,
        });
      } else {
        throw new Error("서버 에러");
      }
    } catch (error) {
      console.error(error.message);
    }
    setIsOpenAddComment(false);
  };

  const toggleRecomment = async () => {
    setIsOpenRecomment((prev) => !prev);

    if (!isOpenRecomment) {
      const data = await getRecommentFetch(element.commentId);
      dispatchRecommentList({
        type: "UPDATE_RECOMMENT_LIST",
        val: data,
      });
    }
  };
  return (
    <li className="flex justify-between mb-5">
      {editMode ? (
        <EditComment
          commentRef={commentRef}
          element={element}
          setEditMode={setEditMode}
          submitComment={submitEditComment}
          userInfo={userInfo}
        />
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
              <CommentInfo
                element={element}
                isOpenComment={isOpenComment}
                toggleCommentBox={toggleCommentBox}
              />
              <div className="w-full">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    id="commentLike"
                    onClick={toggleCommentLike}
                    icon={faHeart}
                    className={`cursor-pointer ${
                      element.isLiked ? "" : "text-white"
                    }  stroke-[10px] stroke-main`}
                  />
                  <span>{element.like}</span>
                  <span className="cursor-pointer" onClick={addComment}>
                    답글 쓰기
                  </span>
                </div>
                {isOpenAddComment && (
                  <div className="w-[800px]">
                    <AddComment submitCommentFn={submitCommentFn} />
                  </div>
                )}
                <div>
                  <span onClick={toggleRecomment} className="cursor-pointer">
                    {isOpenRecomment ? "답글 숨기기" : "답글 보기"}
                  </span>
                  {isOpenRecomment && (
                    <ul className="w-[800px]">
                      {recommentList.map((ele) => (
                        <Recomment
                          updateCommentLikeInfo={updateRecommentLikeInfo}
                          dispatchRecomment={dispatchRecommentList}
                          key={ele.commentId}
                          element={ele}
                        />
                      ))}
                    </ul>
                  )}
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

export default CommentList;
