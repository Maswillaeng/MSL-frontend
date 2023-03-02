import { useContext } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import basicProfile from "../../assets/basic_thumbnail.png";
import UserContext from "../../context/user-context";
import Loading from "../Loading";

const AddComment = ({ submitCommentFn }) => {
  const navigation = useNavigate();
  const commentRef = useRef(null);
  const {
    isLoggedIn,
    userInfo: { userImage },
  } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const checkUserLoginState = (e) => {
    const { id } = e.target;
    if (!isLoggedIn && (id === "comment" || id === "addCommentButton")) {
      navigation("/login");
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    const { value } = commentRef?.current;

    if (value === "") return;

    setIsLoading(true);
    await submitCommentFn(value);
    setIsLoading(false);
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <form
          onClick={checkUserLoginState}
          className="flex flex-col justify-between"
          onSubmit={submitComment}
        >
          <div className="flex">
            <img
              className={`w-[40px] h-[40px] mr-2 rounded-full`}
              alt="사용자 프로필 이미지"
              src={userImage || basicProfile}
            />
            <textarea
              ref={commentRef}
              id="comment"
              className="border-b-2 border-main outline-none resize-none w-full"
              placeholder="댓글 입력"
            ></textarea>
          </div>
          <div className="self-end m-5">
            <button id="addCommentButton" type="submit" className="button">
              등록
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AddComment;
