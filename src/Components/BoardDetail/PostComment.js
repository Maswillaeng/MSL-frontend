import { useContext, useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createCommentFetch, getPostDetailFetch } from "../../api/postFetch";
import basicProfile from "../../assets/basic_thumbnail.png";
import PostContext from "../../context/post-context";
import useFindOpenBarAndClose from "../../hooks/useFindOpenBarAndClose";
import { changeDateToSeconds } from "../../utility/chage-format";
import DropDown from "../UI/DropDown";
import AddComment from "./AddComment";
import CommentList from "./CommentList";

const openButtonText = "<span>정렬기준</span>";

const menuList = [
  { id: "popularity", text: "인기 댓글순" },
  { id: "newest", text: "최신순" },
];

const PostComment = ({ comments }) => {
  const { updateCommentList, getPostInfo } = useContext(PostContext);
  const dropDownRef = useRef(null);
  const [commentSortId, setCommentSortId] = useState(
    localStorage.getItem("sortId") ?? "popularity"
  );
  const [isOpen, setIsOpen] = useFindOpenBarAndClose(dropDownRef, false);
  const { postId } = useParams();

  const changeSort = (e) => {
    setCommentSortId(e.target.id);
    localStorage.setItem("sortId", e.target.id);
  };

  const submitCommentFn = async (value) => {
    try {
      const response = await createCommentFetch(postId, value);

      if (response.ok) {
        const { data } = await getPostDetailFetch(postId);
        console.log(data);
        getPostInfo(data);
      } else {
        throw new Error("서버 에러");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    let sortedCommentList = [...comments];
    if (commentSortId === "newest") {
      sortedCommentList.sort((a, b) => {
        const aDate = changeDateToSeconds(a.createAt);
        const bDate = changeDateToSeconds(b.createAt);
        return bDate - aDate;
      });
    } else {
      sortedCommentList.sort((a, b) => b.like - a.like);
    }
    updateCommentList(sortedCommentList);
  }, [commentSortId]);
  return (
    <div className="w-full mt-10">
      <div className="flex gap-5 mb-10">
        <span>댓글 {comments.length}개</span>
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
      <AddComment submitCommentFn={submitCommentFn} />
      <ul className="w-full">
        {comments?.map((ele) => (
          <CommentList
            key={ele.commentId}
            element={ele}
            basicProfile={basicProfile}
            comments={comments}
          />
        ))}
      </ul>
    </div>
  );
};

export default PostComment;
