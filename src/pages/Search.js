import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GridCard } from "../Components/Board/PostList";
import Card from "../Components/Card";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import InfinityScroll from "../utility/infinity-scroll";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigation = useNavigate();
  const [postList, setPostList] = useState([]);
  const lastCardRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const searchPost = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  useEffect(() => {
    const getSearchData = setTimeout(() => {
      navigation(`/search?keyword=${searchValue}`);
      getPostOfSearchValueData();
    }, 500);

    return () => clearTimeout(getSearchData);
  }, [searchValue]);

  const getPostOfSearchValueData = async (page = 1) => {
    setIsLoading(true);
    const response = await fetch(
      `http://localhost:8080/api/search?keyword=${searchValue}&page=${page}`
    );
    if (response.ok) {
      const { data } = await response.json();
      setTotalElements(data.totalElements);
      setPostList((prevList) => {
        return [...prevList, ...data.content];
      });
    }
    setIsLoading(false);
  };

  const setPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  InfinityScroll(
    postList.length,
    setPage,
    currentPage,
    lastCardRef,
    getPostOfSearchValueData,
    totalElements
  );
  return (
    <>
      <Header />
      <div className="text-center mt-20">
        <label className="border-2 border-main p-3">
          <FontAwesomeIcon
            className="w-[18px] h-[18px] text-main mr-5"
            icon={faMagnifyingGlass}
          />
          <input
            value={searchValue}
            onChange={searchPost}
            className="w-1/2 outline-none"
            placeholder="검색어를 입력하세요"
          />
        </label>
        <div className="mt-10 text-main font-bold text-xl">
          <span>{`총 ${totalElements}개의 게시물`}</span>
        </div>
      </div>

      <div className="mx-[100px] mt-10">
        <GridCard>
          {postList?.map((ele, index) => {
            if (postList.length - 1 === index) {
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

export default Search;
