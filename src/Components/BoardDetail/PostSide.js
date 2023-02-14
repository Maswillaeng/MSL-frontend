import { faHeart, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useState } from "react";

const PostSide = ({ likeNumber, isLiked }) => {
  const [isLike, setIsLike] = useState(isLiked);
  const copyUrlListRef = useRef(null);

  const toggleLikeHandler = () => {
    setIsLike((prev) => !prev);
  };

  const copyUrl = () => {
    const { href } = window.location;
    console.log(href);
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
    <ul className="fixed left-32 top-44 flex flex-col gap-3 items-center border-main border-2 p-5 rounded-full">
      <li className="flex flex-col items-center">
        <button
          onClick={toggleLikeHandler}
          className={`circle-button  ${
            isLike ? "bg-white text-main" : "bg-main text-white"
          }`}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <span>{likeNumber}</span>
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
