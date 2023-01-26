import Header from "../Components/Header";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import PostContext from "../context/post-context";
import { getPostDetailFetch } from "../api/postFetch";
import PostHead from "../Components/BoardDetail/PostHead";
import PostMain from "../Components/BoardDetail/PostMain";
import PostComment from "../Components/BoardDetail/PostComment";

const BoardDetail = () => {
  const { postInfo, updatePostInfo } = useContext(PostContext);
  const { nickName, title } = postInfo;
  const { postId } = useParams();
  const contentRef = useRef(null);

  useEffect(() => {
    const getPostDetailData = async () => {
      const { nickName, title, content } = await getPostDetailFetch(postId);
      updatePostInfo(nickName, title, content);
      contentRef.current.innerHTML = content;
    };
    getPostDetailData();
  }, [postId]);
  return (
    <>
      <Header />
      <div className="mt-20 mx-[20%] min-w-[900px]">
        <PostHead nickName={nickName} postId={postId} />
        <PostMain contentRef={contentRef} title={title} />
        <PostComment nickName={nickName} />
      </div>
    </>
  );
};

export default BoardDetail;
