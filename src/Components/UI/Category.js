import { useContext } from "react";
import PostContext from "../../context/post-context";

const Category = () => {
  const { categoryList, setCurrentCategory } = useContext(PostContext);
  const changeCurrentCategory = (e) => {
    const { id } = e.target.closest(".category");
    setCurrentCategory(id);
  };
  return (
    <>
      <ul className="flex items-center gap-7">
        {categoryList.map((val) => (
          <li id={val.id} className="category cursor-pointer" key={val.id}>
            <button onClick={changeCurrentCategory} className="button">
              {val.category}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Category;
