import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getSubscribePostFetch } from "../api/postFetch";
import PostList, { GridCard } from "../Components/Board/PostList";
import Card from "../Components/Card";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import PostTab from "../Components/UI/PostTab";
import InfinityScroll from "../utility/infinity-scroll";

const guideMessage =
  "팔로잉한 유저가 없거나 팔로잉한 유저의 게시물이 없습니다.";

const SubscribeBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState([]);
  const lastCardRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const getSubscribePostData = async (page) => {
    setIsLoading(true);
    const { data } = await getSubscribePostFetch(page);
    setTotalElements(data.totalElements);
    setPost((prevList) => {
      return [...prevList, ...data.content];
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getSubscribePostData(currentPage);
  }, []);

  const setPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  InfinityScroll(
    post.length,
    setPage,
    currentPage,
    lastCardRef,
    getSubscribePostData,
    totalElements
  );
  //페이지 작업 안하는지?
  return (
    <>
      <Header />
      <div className="mt-10 mx-[100px]">
        <PostTab pathName="/subscribe" />
        {post.length === 0 ? (
          <div>
            <span>{guideMessage}</span>
          </div>
        ) : (
          <div className="mx-[100px] mt-10">
            <GridCard>
              {post?.map((ele, index) => {
                if (post.length - 1 === index) {
                  return (
                    <Card
                      lastCardRef={lastCardRef}
                      key={ele.postId}
                      ele={ele}
                    />
                  );
                } else {
                  return <Card key={ele.postId} ele={ele} />;
                }
              })}
            </GridCard>
            {isLoading && <Loading />}
          </div>
        )}
      </div>
    </>
  );
};

export default SubscribeBoard;
