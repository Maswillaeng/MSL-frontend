import { useContext } from "react";
import { Link } from "react-router-dom";
import PostContext from "../../context/post-context";

const Category = () => {
  const { categoryList, setCurrentCategory, currentCategory } =
    useContext(PostContext);
  const changeCurrentCategory = (e) => {
    const { id } = e.target.closest(".category");
    setCurrentCategory(id);
    localStorage.setItem("category", id);
  };
  return (
    <>
      <ul className="flex items-center gap-7">
        {categoryList.map((val) => (
          <Link key={val.id} to={`/post?category=${val.id}`}>
            <li id={val.id} className={`category cursor-pointer`}>
              <button
                onClick={changeCurrentCategory}
                className={`${
                  currentCategory === val.id ? "target-button" : "button"
                }`}
              >
                {val.category}
              </button>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default Category;
