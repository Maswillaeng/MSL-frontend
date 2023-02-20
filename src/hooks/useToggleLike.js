import { useState } from "react";

const useToggleLike = (
  isLoggedIn,
  likeNumber,
  isLiked,
  updateLikeFetch,
  Id
) => {
  const [likeCount, setLikeCount] = useState(likeNumber);
  const [isLike, setIsLike] = useState(isLiked);
  const toggleLike = async () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용해주세요");
      return;
    }
    let sendLikeValue = likeCount;
    if (isLike) {
      sendLikeValue -= 1;
    } else {
      sendLikeValue += 1;
    }
    try {
      const response = await updateLikeFetch(Id);
      if (response.ok) {
        if (isLike) {
          setLikeCount((prev) => prev - 1);
        } else {
          setLikeCount((prev) => prev + 1);
        }
        setIsLike((prev) => !prev);
      } else {
        throw new Error("에러 발생");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return { toggleLike, likeCount, isLike };
};

export default useToggleLike;
