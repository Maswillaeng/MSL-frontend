import { useRef, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GridCard } from "../Components/Board/PostList";
import Card from "../Components/Card";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import InfinityScroll from "../utility/infinity-scroll";

const TagPage = () => {
  const { tagId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState([]);
  const lastCardRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const getTagListData = async (page) => {
    setIsLoading(true);
    const response = await fetch(
      `http://localhost:8080/api/search/tag?name=${tagId}&page=${page}`
    );
    if (response.ok) {
      const { data } = await response.json();
      setPost((prevList) => {
        return [...prevList, ...data.content];
      });
      setTotalElements(data.totalElements);
    }
    setIsLoading(false);
  };

  const setPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    getTagListData(currentPage);
  }, []);

  useEffect(() => {
    const getBestTagData = async () => {
      const response = await fetch(`http://localhost:8080/api/best-tag`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    };
    getBestTagData();
  });

  InfinityScroll(
    post.length,
    setPage,
    currentPage,
    lastCardRef,
    getTagListData,
    totalElements
  );

  return (
    <>
      <Header />
      <div className="text-center text-main">
        <h1 className="text-5xl font-bold ">#{tagId}</h1>
        <div className="mt-10 font-bold text-xl">
          <span>{`총 ${totalElements}개의 게시물`}</span>
        </div>
      </div>

      <div className="mx-[100px] mt-10">
        <GridCard>
          {post?.map((ele, index) => {
            if (post.length - 1 === index) {
              return (
                <Card lastCardRef={lastCardRef} key={ele.postId} ele={ele} />
              );
            } else {
              return <Card key={ele.postId} ele={ele} />;
            }
          })}
        </GridCard>
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default TagPage;
