import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GridCard } from "../Components/Board/PostList";
import Card from "../Components/Card";
import Header from "../Components/Header";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigation = useNavigate();
  const [postList, setPostList] = useState([]);
  const lastCardRef = useRef(null);

  const searchPost = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  useEffect(() => {
    const getSearchData = setTimeout(() => {
      if (searchValue === "") return;
      navigation(`/search?keyword=${searchValue}`);
      getPostOfSearchValueData();
    }, 300);

    return () => clearTimeout(getSearchData);
  }, [searchValue]);

  const getPostOfSearchValueData = async () => {
    const response = await fetch(
      `http://localhost:8080/api/search?keyword=${searchValue}`
    );
    if (response.ok) {
      const { data } = await response.json();
      setPostList(data.content);
    }
  };
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
      </div>
      <div>
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
    </>
  );
};

export default Search;
