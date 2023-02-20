import { faHeart, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useRef } from "react";
import { updateLikeNumberFetch } from "../../api/postFetch";
import UserContext from "../../context/user-context";
import useToggleLike from "../../hooks/useToggleLike";

const PostSide = ({ likeNumber, isLiked, postId }) => {
  const { isLoggedIn } = useContext(UserContext);
  const { isLike, likeCount, toggleLike } = useToggleLike(
    isLoggedIn,
    likeNumber,
    isLiked,
    updateLikeNumberFetch,
    postId
  );
  const copyUrlListRef = useRef(null);

  const toggleLikeHandler = async () => {
    toggleLike();
  };

  const copyUrl = () => {
    const { href } = window.location;
    window.navigator.clipboard.writeText(href).then(
      () => {
        copyUrlListRef.current.classList.add("bg-green-600");
        setTimeout(() => {
          copyUrlListRef.current.classList.remove("bg-green-600");
        }, 500);
      },
      () => {
        copyUrlListRef.current.classList.add("bg-red-600");
        setTimeout(() => {
          copyUrlListRef.current.classList.remove("bg-red-600");
        }, 500);
      }
    );
  };
  return (
    <ul className="fixed right-20 top-44 flex flex-col gap-3 items-center border-main border-2 p-5 rounded-full z-20 bg-gradient-to-br from-red-100 via-red-200 to-red-400">
      <li className="flex flex-col items-center">
        <button
          onClick={toggleLikeHandler}
          className={`circle-button  ${
            isLike ? "bg-main text-white" : "bg-white text-main"
          } ${
            isLoggedIn && "active:scale-125 active:duration-200"
          } duration-300 scale-100`}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <span>{likeCount}</span>
      </li>
      <li>
        <button
          onClick={copyUrl}
          ref={copyUrlListRef}
          className="circle-button text-main duration-500"
        >
          <FontAwesomeIcon icon={faLink} />
        </button>
      </li>
    </ul>
  );
};

export default PostSide;
