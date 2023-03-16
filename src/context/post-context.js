import { createContext, useReducer } from "react";

const PostContext = createContext({
  postInfo: {},
  getPostInfo: () => {},
  updateLikeInfo: () => {},
  updateCommentList: () => {},
  updateCommentContent: () => {},
  deleteComment: () => {},
  updateCommentLikeInfo: () => {},
  dispatchPostInfo: () => {},
  reportPost: () => {},
});

const postInfoReducer = (state, { type, val }) => {
  let copyState = JSON.parse(JSON.stringify(state));
  switch (type) {
    case "UPDATE_REPORT_STATE":
      copyState.reported = val;
      return copyState;
    case "UPDATE_POST":
      copyState = val;
      return copyState;
    case "UPDATE_LIKE":
      copyState.likeNumber = val.likeNumber;
      copyState.isLiked = val.isLiked;
      return copyState;
    case "UPDATE_COMMENT_LIKE":
      const newLikeArray = copyState.commentList.map((ele) => {
        if (ele.commentId === val.commentId) {
          ele.like = val.likeNumber;
          ele.isLiked = val.isLiked;
        }
        return ele;
      });
      copyState.commentList = [...newLikeArray];
      return copyState;
    case "UPDATE_COMMENT_LIST":
      copyState.commentList = val;
      return copyState;
    case "UPDATE_COMMENT_CONTENT":
      const newArray = copyState.commentList.map((ele) => {
        if (ele.commentId === val.commentId) {
          ele.content = val.value;
        }
        return ele;
      });
      copyState.commentList = [...newArray];
      return copyState;
    case "DELETE_COMMENT":
      const findIndex = copyState.commentList.findIndex(
        (ele) => ele.commentId === val
      );
      copyState.commentList.splice(findIndex, 1);
      return copyState;
    default:
      return null;
  }
};

export const PostProvider = (props) => {
  const [postInfo, dispatchPostInfo] = useReducer(postInfoReducer, {});

  const reportPost = (state) => {
    dispatchPostInfo({
      type: "UPDATE_REPORT_STATE",
      val: state,
    });
  };

  const getPostInfo = (postObj) => {
    dispatchPostInfo({
      type: "UPDATE_POST",
      val: postObj,
    });
  };

  const updateLikeInfo = (likeNumber, isLiked) => {
    dispatchPostInfo({
      type: "UPDATE_LIKE",
      val: { likeNumber, isLiked },
    });
  };

  const updateCommentLikeInfo = (likeNumber, isLiked, commentId) => {
    dispatchPostInfo({
      type: "UPDATE_COMMENT_LIKE",
      val: { likeNumber, isLiked, commentId },
    });
  };

  const updateCommentList = (commentList) => {
    dispatchPostInfo({
      type: "UPDATE_COMMENT_LIST",
      val: commentList,
    });
  };

  const updateCommentContent = (commentId, value) => {
    dispatchPostInfo({
      type: "UPDATE_COMMENT_CONTENT",
      val: { value, commentId },
    });
  };

  const deleteComment = (commentId) => {
    dispatchPostInfo({
      type: "DELETE_COMMENT",
      val: commentId,
    });
  };
  return (
    <PostContext.Provider
      value={{
        getPostInfo,
        postInfo,
        updateLikeInfo,
        updateCommentList,
        updateCommentContent,
        deleteComment,
        updateCommentLikeInfo,
        dispatchPostInfo,
        reportPost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostContext;
