import { useContext } from "react";
import PostContext from "../../context/post-context";

const Category = () => {
  const { categoryList } = useContext(PostContext);
  const getCategoryId = (e) => {
    console.log(e.target.closest(".category").id);
  };
  return (
    <>
      <ul className="flex items-center gap-7">
        {categoryList.map((val) => (
          <li id={val.id} className="category cursor-pointer" key={val.id}>
            <button onClick={getCategoryId} className="button">
              {val.category}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Category;
