import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { updateCommentLikeNumberFetch } from "../../api/postFetch";
import basicProfile from "../../assets/basic_thumbnail.png";
import UserContext from "../../context/user-context";
import useComment from "../../hooks/useComment";
import useToggleLike from "../../hooks/useToggleLike";
import CommentInfo from "./CommentInfo";
import CommentMenuBar from "./CommentMenuBar";
import EditComment from "./EditComment";

const menuButtonText = ` <svg fill="#AA233C" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
    <path d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z" />
  </svg>`;

const Recomment = ({ element, updateCommentLikeInfo, dispatchRecomment }) => {
  const { isLoggedIn, userInfo } = useContext(UserContext);
  const commentRef = useRef(null);

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
    setEditMode,
    isOpenComment,
    submitEditComment,
    toggleCommentBox,
    toggleCommentLike,
  } = useComment(toggleLike, dispatchRecomment, element, commentRef);

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
                className="max-w-[30px] max-h-[30px] min-w-[30px] min-h-[30px] mr-2 rounded-full"
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
                </div>
              </div>
            </div>
          </div>
          <CommentMenuBar
            deleteComment={deleteComment}
            editComment={editComment}
            element={element}
            menuButtonText={menuButtonText}
            userInfo={userInfo}
          />
        </>
      )}
    </li>
  );
};

export default Recomment;
