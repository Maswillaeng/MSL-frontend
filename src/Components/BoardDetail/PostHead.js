import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { deletePostFetch } from "../../api/postFetch";

const PostHead = ({ nickName, postId }) => {
  const navigation = useNavigate();
  const menuListRef = useRef(null);
  const copyUrlListRef = useRef(null);

  const showMenu = () => {
    menuListRef.current.classList.toggle("hidden");
  };

  const copyUrl = () => {
    const { href } = window.location;
    window.navigator.clipboard.writeText(href).then(
      () =>
        copyUrlListRef.current.classList.add("border-b-2", "border-green-600"),
      () => copyUrlListRef.current.classList.add("border-b-2", "border-red-600")
    );
  };

  const getModifyPage = () => {
    navigation(`/post/manage/${postId}`);
  };

  const deletePost = async () => {
    const answer = window.confirm("정말로 삭제하시겠습니까?");
    if (answer) {
      await deletePostFetch(postId, navigation);
    } else {
      navigation(`/post/detail/${postId}`);
    }
  };

  return (
    <div className="flex">
      <div className="max-w-[50px] max-h-[50px] min-w-[50px] min-h-[50px] mr-5 profile_img"></div>
      <ul className="basis-[80%]">
        <li>{nickName}</li>
        <li>작성일자</li>
      </ul>
      <ul className="flex gap-4 basis-[20%] mt-3">
        <li>댓글</li>
        <li ref={copyUrlListRef} className="cursor-pointer" onClick={copyUrl}>
          url복사
        </li>
        <li className="cursor-pointer relative" onClick={showMenu}>
          <FontAwesomeIcon icon={faEllipsisV} />
          <ul className="hidden absolute w-10" ref={menuListRef}>
            <li onClick={getModifyPage}>수정</li>
            <li onClick={deletePost}>삭제</li>
            <li>신고</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default PostHead;
