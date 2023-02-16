import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { updateCommentLikeNumberFetch } from "../../api/postFetch";
import UserContext from "../../context/user-context";
import useToggleLike from "../../hooks/useToggleLike";
import { changeDateFormat } from "../../utility/chage-format";

const CommentList = ({ ele, basicProfile }) => {
  const { isLoggedIn } = useContext(UserContext);
  const { isLike, likeCount, toggleLike } = useToggleLike(
    isLoggedIn,
    ele.like,
    ele.isLiked,
    updateCommentLikeNumberFetch
  );

  const toggleCommentLike = () => {
    toggleLike();
  };

  return (
    <li className="flex mb-5">
      <img
        className="max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] mr-2 rounded-full"
        alt="해당 댓글 유저이미지"
        src={basicProfile}
      />
      <div className="flex flex-col">
        <ul className="flex gap-3">
          <li className="text-[5px]">{ele.nickName}</li>
          <li className="text-[5px]">
            {changeDateFormat(ele.createdAt, {
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
    </li>
  );
};

export default CommentList;
