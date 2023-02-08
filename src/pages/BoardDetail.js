import Header from "../Components/Header";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import PostContext from "../context/post-context";
import { getPostDetailFetch } from "../api/postFetch";
import PostHead from "../Components/BoardDetail/PostHead";
import PostMain from "../Components/BoardDetail/PostMain";
import PostComment from "../Components/BoardDetail/PostComment";
import Loading from "../Components/Loading";
import UserContext from "../context/user-context";

const BoardDetail = () => {
  const { userInfo } = useContext(UserContext);
  const { postInfo, getPostInfo } = useContext(PostContext);
  const { nickName, title, userImage } = postInfo;
  const { postId } = useParams();
  const contentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPostDetailData = async () => {
      setIsLoading(true);
      const { nickName, title, content, userImage } = await getPostDetailFetch(
        postId
      );
      setIsLoading(false);
      getPostInfo(nickName, title, content, userImage); //게시물 주인의 이미지도 갖고 와야함
      contentRef.current.innerHTML = content;
    };
    getPostDetailData();
  }, [postId]);
  return (
    <>
      <Header />
      <div className="mt-20 mx-[20%] min-w-[900px]">
        <PostHead
          nickName={nickName}
          postId={postId}
          userImage={userImage}
          userInfo={userInfo}
        />
        <PostMain contentRef={contentRef} title={title} />
        <PostComment nickName={nickName} />
      </div>
      {isLoading ? <Loading /> : null}
    </>
  );
};

export default BoardDetail;
