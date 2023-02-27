import { useContext, useState } from "react";
import PostContext from "../context/post-context";

const useToggleLike = (
  isLoggedIn,
  likeNumber,
  isLiked,
  updateLikeFetch,
  Id,
  updateLikeInfo
) => {
  const toggleLike = async () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용해주세요");
      return;
    }
    if (!isLiked) {
      try {
        const response = await updateLikeFetch(Id, "POST");
        if (response.ok) {
          updateLikeInfo(likeNumber + 1, true, Id);
        }
      } catch (error) {
        console.error(error.message);
      }
    } else {
      try {
        const response = await updateLikeFetch(Id, "DELETE");
        if (response.ok) {
          updateLikeInfo(likeNumber - 1, false, Id);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return { toggleLike };
};

export default useToggleLike;
