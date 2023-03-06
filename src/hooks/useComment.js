import { useState } from "react";
import { deleteCommentFetch, editCommentFetch } from "../api/postFetch";

const useComment = (toggleLike, dispatchComment, element, commentRef) => {
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const toggleCommentBox = () => {
    setIsOpenComment((prev) => !prev);
  };

  const toggleCommentLike = () => {
    toggleLike();
  };

  const editComment = () => {
    setEditMode((prev) => !prev);
  };

  const deletePostComment = (id) => {
    dispatchComment({
      type: "DELETE_COMMENT",
      val: id,
    });
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

  const updateCommentContent = (id, value) => {
    dispatchComment({
      type: "UPDATE_COMMENT_CONTENT",
      val: { commentId: id, value },
    });
  };

  const submitEditComment = async (e) => {
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

  return {
    isOpenComment,
    editMode,
    setEditMode,
    toggleCommentBox,
    toggleCommentLike,
    editComment,
    deleteComment,
    submitEditComment,
  };
};

export default useComment;
