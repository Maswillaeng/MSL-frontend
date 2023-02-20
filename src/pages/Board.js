import { Link } from "react-router-dom";
import PostList from "../Components/Board/PostList";
import Header from "../Components/Header";
import Category from "../Components/UI/Category";
import useCategory from "../hooks/useCategory";
import "../styles/input.css";

const categoryList = [
  { id: "", category: "전체" },
  { id: "RECIPE", category: "레시피" },
  { id: "BAR_SNACK", category: "안주 추천" },
  { id: "FREE", category: "자유" },
  { id: "BEST", category: "인기" },
];

const Board = () => {
  const { changeCurrentCategory, category } = useCategory("postCategory");
  return (
    <>
      <Header />
      <div className="mt-10 mx-[100px]">
        <header className="flex justify-between mb-7">
          <Category
            categoryList={categoryList}
            changeCurrentCategory={changeCurrentCategory}
            category={category}
          />
          <div>
            <Link to={"/post/create"}>
              <button className="button">글쓰기</button>
            </Link>
          </div>
        </header>
        <PostList category={category} />
      </div>
    </>
  );
};

export default Board;
