import { Link } from "react-router-dom";
import Category from "../Components/Board/Category";
import ListOfTableSort from "../Components/Board/ListOfTableSort";
import PostList from "../Components/Board/PostList";
import Header from "../Components/Header";
import Button from "../Components/UI/Button";
import "../styles/input.css";

const Board = () => {
  return (
    <>
      <Header />
      <div className="mt-20 mx-[200px]">
        <header className="flex justify-between mb-7">
          <Category />
          <div>
            <Link to={"/post/create"}>
              <Button text="글쓰기" />
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
