import { useContext, useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCommentFetch, getPostDetailFetch } from "../../api/postFetch";
import basicProfile from "../../assets/basic_profile.jpg";
import PostContext from "../../context/post-context";
import UserContext from "../../context/user-context";
import useFindOpenBarAndClose from "../../hooks/useFindOpenBarAndClose";
import { changeDateToSeconds } from "../../utility/chage-format";
import Loading from "../Loading";
import DropDown from "../UI/DropDown";
import CommentList from "./CommentList";

const openButtonText = "<span>정렬기준</span>";

const menuList = [
  { id: "popularity", text: "인기 댓글순" },
  { id: "newest", text: "최신순" },
];

const PostComment = () => {
  const { isLoggedIn, userInfo } = useContext(UserContext);
  const {
    getPostInfo,
    postInfo: { commentObj },
  } = useContext(PostContext);
  const navigation = useNavigate();
  const { postId } = useParams();
  const { commentNumber, commentList } = commentObj;
  const dropDownRef = useRef(null);
  const commentRef = useRef(null);
  const [comments, setComments] = useState(commentList);
  const [isLoading, setIsLoading] = useState(false);
  const [commentSortId, setCommentSortId] = useState(
    localStorage.getItem("sortId") ?? "popularity"
  );
  const [isOpen, setIsOpen] = useFindOpenBarAndClose(dropDownRef, false);

  const submitComment = async (e) => {
    e.preventDefault();
    const { value } = commentRef?.current;

    setIsLoading(true);
    try {
      const response = await createCommentFetch(value);
      if (response.ok) {
        const {
          data: { postObj },
        } = await getPostDetailFetch(postId);

        getPostInfo(postObj);
        setIsLoading(false);
      } else {
        throw new Error("서버 에러");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const changeSort = (e) => {
    setCommentSortId(e.target.id);
    localStorage.setItem("sortId", e.target.id);
  };

  const checkUserLoginState = (e) => {
    const { id } = e.target;
    if (!isLoggedIn && (id === "comment" || id === "addCommentButton")) {
      navigation("/login");
    }
  };

  useEffect(() => {
    let sortedCommentList = [...comments];
    if (commentSortId === "newest") {
      sortedCommentList.sort((a, b) => {
        const aDate = changeDateToSeconds(a.createdAt);
        const bDate = changeDateToSeconds(b.createdAt);
        return bDate - aDate;
      });
    } else {
      sortedCommentList.sort((a, b) => b.like - a.like);
    }
    setComments(sortedCommentList);
  }, [commentSortId]);
  return (
    <div className="w-full mt-10">
      <div className="flex">
        <span className="mr-5">댓글 {commentNumber}개</span>
        <label className="relative">
          <DropDown
            openButtonText={openButtonText}
            dropDownRef={dropDownRef}
            setIsOpen={setIsOpen}
          />
          {isOpen ? (
            <ul className="absolute z-20 bg-sub rounded-[5px] top-8 -left-1 text-center break-keep">
              {menuList.map((ele) => (
                <li
                  id={ele.id}
                  onClick={changeSort}
                  className={`${
                    commentSortId === ele.id ? "bg-red-200" : "hover:bg-red-200"
                  } pointer`}
                  key={ele.id}
                >
                  {ele.text}
                </li>
              ))}
            </ul>
          ) : null}
        </label>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <form
          onClick={checkUserLoginState}
          className="flex flex-col justify-between mt-10"
          onSubmit={submitComment}
        >
          <div className="flex">
            <img
              className="max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] mr-2 rounded-full"
              alt="사용자 프로필 이미지"
              src={basicProfile}
            />
            <textarea
              ref={commentRef}
              id="comment"
              className="border-b-2 border-main outline-none resize-none w-full h-auto overflow-auto"
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
      <ul className="w-full">
        {comments.map((ele) =>
          ele.nickName === userInfo.nickName ? (
            <CommentList key={ele.id} ele={ele} basicProfile={basicProfile} />
          ) : (
            <CommentList key={ele.id} ele={ele} basicProfile={basicProfile} />
          )
        )}
      </ul>
    </div>
  );
};

export default PostComment;
