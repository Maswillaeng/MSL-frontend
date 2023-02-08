import { Link } from "react-router-dom";
import ListOfTableSort from "../Components/Board/ListOfTableSort";
import PostList from "../Components/Board/PostList";
import Header from "../Components/Header";
import Category from "../Components/UI/Category";
import "../styles/input.css";

const Board = () => {
  const categoryList = ["전체", "레시피", "추천", "자유"];
  return (
    <>
      <Header />
      <div className="mt-20 mx-[200px]">
        <header className="flex justify-between mb-7">
          <Category categoryList={categoryList} />
          <div>
            <Link to={"/post/create"}>
              <button className="button">글쓰기</button>
            </Link>
          </div>
        </header>
        <ListOfTableSort />
        <PostList />
      </div>
    </>
  );
};

export default Board;
