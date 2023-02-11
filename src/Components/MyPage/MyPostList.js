import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { deletePostFetch } from "../../api/postFetch";

const MyPostList = ({
  listPostId,
  listPostTitle,
  listPostNickName,
  listPostCreatedAt,
}) => {
  const manageListRef = useRef(null);
  const navigation = useNavigate();

  const showManageBtn = () => {
    manageListRef.current.classList.remove("hidden");
    manageListRef.current.classList.add("flex");
  };

  const hiddenManageBtn = () => {
    manageListRef.current.classList.add("hidden");
    manageListRef.current.classList.remove("flex");
  };

  const editPost = (e) => {
    const { id } = e.target.closest(".postList");
    navigation(`/post/manage/${id}`);
  };

  const deletePost = async (e) => {
    const { id } = e.target.closest(".postList");
    const answer = window.confirm("정말로 삭제하시겠습니까?");
    if (answer) {
      await deletePostFetch(id);
      window.location.replace("/users/1");
    }
  };
  return (
    <>
      <li
        onMouseEnter={showManageBtn}
        onMouseLeave={hiddenManageBtn}
        className="postList border-2 border-main h-[80px] py-6 hover:bg-sub"
        id={listPostId}
        key={listPostId}
      >
        <ul className="grid grid-cols-[50px_100px_minmax(200px,_1fr)_100px_100px]">
          <li className="text-center">{listPostId}</li>
          <li className="text-center">레시피</li>
          <li className="flex justify-between mx-10">
            <div
              onClick={() => navigation(`/post/detail/${listPostId}`)}
              className="w-[200px] cursor-pointer hover:border-b-2 border-main truncate"
            >
              {listPostTitle}
            </div>
            <div>
              <ul className="manageList gap-5 hidden" ref={manageListRef}>
                <li onClick={editPost} className="button cursor-pointer">
                  수정
                </li>
                <li onClick={deletePost} className="button cursor-pointer">
                  삭제
                </li>
              </ul>
            </div>
          </li>
          <li className="text-center">{listPostNickName}</li>
          <li className="text-center">{listPostCreatedAt}</li>
        </ul>
      </li>
    </>
  );
};

export default MyPostList;
