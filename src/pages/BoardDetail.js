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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faLink } from "@fortawesome/free-solid-svg-icons";
import PostSide from "../Components/BoardDetail/PostSide";
import basicProfile from "../assets/basic_profile.jpg";

const BoardDetail = () => {
  // const { userInfo } = useContext(UserContext);
  // const {
  //   postInfo: { nickName, title, userImage },
  //   getPostInfo,
  // } = useContext(PostContext);
  const { postId } = useParams();
  const contentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const getPostDetailData = async () => {
  //     setIsLoading(true);
  //     const {
  //       data: { nickName, title, content, userImage, createdAt },
  //     } = await getPostDetailFetch(postId);
  //     //
  //     setIsLoading(false);
  //     getPostInfo(nickName, title, content, userImage, createdAt);
  //     contentRef.current.innerHTML = content;
  //   };
  //   getPostDetailData();
  // }, [postId]);
  const userInfo = {
    nickName: "빠박이",
    userImage: basicProfile,
    isLoggedIn: true,
  };
  const postObj = {
    nickName: "계란",
    userImage: basicProfile,
    title:
      "타이틀타이틀타이틀타이틀타이틀타이틀타이틀타이틀타이틀타이틀타이틀타이틀타이틀타이틀",
    createdAt: "2023-02-08T18:07:17.788471",
    content: "오늘 소개할 레시피는 짜장면",
    postId: 1,
    isLiked: true,
    isReported: false,
    likeNumber: 80,
    commentObj: {
      commentNumber: 2,
      commentList: [
        {
          id: 1,
          content: "정말 멋진 글이네요!ㅋ",
          createdAt: "2023-02-08T18:07:17.788471",
          isLiked: true,
          like: 6,
          nickName: "짜장면",
          userImage: basicProfile,
        },
        {
          id: 2,
          content: "이번 레시피 대박",
          createdAt: "2023-03-08T18:07:17.788471",
          like: 35,
          isLiked: false,
          nickName: "짬뽕",
          userImage: basicProfile,
        },
      ],
    },
  };

  const {
    nickName: postUserNickName,
    userImage: postUserImage,
    commentObj,
    content,
    createdAt,
    isLiked,
    isReported,
    title,
    likeNumber,
  } = postObj;
  return (
    <>
      <Header />
      <div className="mt-14 mx-[20%] min-w-[900px] text-main pb-10">
        <PostHead
          postUserNickName={postUserNickName}
          postId={postId}
          postUserImage={postUserImage}
          createdAt={createdAt}
          isLiked={isLiked}
          isReported={isReported}
          userInfo={userInfo}
        />
        <PostMain contentRef={contentRef} title={title} content={content} />
        <PostComment commentObj={commentObj} />
        <PostSide likeNumber={likeNumber} isLiked={isLiked} />
      </div>
      {isLoading ? <Loading /> : null}
    </>
  );
};

export default BoardDetail;
