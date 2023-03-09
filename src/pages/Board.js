import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostList from "../Components/Board/PostList";
import Header from "../Components/Header";
import Category from "../Components/UI/Category";
import useCategory from "../hooks/useCategory";
import useFetch from "../hooks/useFetch";
import { getPostListFetch } from "../api/postFetch";
import "../styles/input.css";
import PostTab from "../Components/UI/PostTab";

const categoryList = [
  { id: "", category: "전체" },
  { id: "RECIPE", category: "레시피" },
  { id: "BAR_SNACK", category: "안주 추천" },
  { id: "FREE", category: "자유" },
  { id: "BEST", category: "인기" },
];

const Board = () => {
  const [postDataMap, setPostDataMap] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { changeCurrentCategory, category } = useCategory("postCategory");

  const post = postDataMap[category] || [];

  const getPostListData = async () => {
    if (!postDataMap[category]) {
      setIsLoading(true);
      const { data } = await getPostListFetch(category);
      setPostDataMap((prevMap) => {
        const newData = data;
        return { ...prevMap, [category]: newData };
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPostListData();
  });

  return (
    <>
      <Header />
      <div className="mt-10 mx-[100px]">
        <PostTab pathName="/" />
        <header className="flex justify-between mb-7">
          <Category
            categoryList={categoryList}
            changeCurrentCategory={changeCurrentCategory}
            category={category}
          />
        </header>
        <PostList post={post} isLoading={isLoading} />
      </div>
    </>
  );
};

export default Board;
