import Header from "../Components/Header";
import { useState } from "react";
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
import PostSide from "../Components/BoardDetail/PostSide";

const BoardDetail = () => {
  const { userInfo } = useContext(UserContext);
  const { postInfo, getPostInfo } = useContext(PostContext);
  const { postId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPostDetailData = async () => {
      setIsLoading(true);
      const { data } = await getPostDetailFetch(postId);
      console.log(data);
      setIsLoading(false);
      getPostInfo(data);
    };
    getPostDetailData();
  }, [postId]);
  return (
    <>
      <Header />
      {postInfo?.nickName && (
        <div className="mt-14 mx-[20%] min-w-[900px] text-main pb-10">
          <PostHead
            postUserNickName={postInfo?.nickName}
            postId={postInfo?.postId}
            postUserImage={postInfo?.userImage}
            createdAt={postInfo?.createdAt}
            isReported={postInfo?.isReported}
            userInfo={userInfo}
            postUserId={postInfo.userId}
          />
          <PostMain title={postInfo?.title} content={postInfo?.content} />
          <PostComment
            comments={postInfo?.commentList}
            userId={postInfo?.userId}
          />
          <PostSide
            postId={postInfo?.postId}
            likeNumber={postInfo?.likeNumber}
            isLiked={postInfo?.liked}
          />
        </div>
      )}
      {isLoading ? <Loading /> : null}
    </>
  );
};

export default BoardDetail;
