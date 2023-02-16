import { Link } from "react-router-dom";
import PostList from "../Components/Board/PostList";
import Header from "../Components/Header";
import Category from "../Components/UI/Category";
import "../styles/input.css";

const Board = () => {
  return (
    <>
      <Header />
      <div className="mt-10 mx-[100px]">
        <header className="flex justify-between mb-7">
          <Category />
          <div>
            <Link to={"/post/create"}>
              <button className="button">글쓰기</button>
            </Link>
          </div>
        </header>
        <PostList />
      </div>
    </>
  );
};

export default Board;
