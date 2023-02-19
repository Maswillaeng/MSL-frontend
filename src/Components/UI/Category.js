import { Link } from "react-router-dom";

const Category = ({ categoryList, changeCurrentCategory, category }) => {
  return (
    <>
      <ul className="flex items-center gap-7">
        {categoryList.map((val) => (
          <Link key={val.id} to={`${val.id ? `?category=${val.id}` : ""}`}>
            <li id={val.id} className={`category cursor-pointer`}>
              <button
                onClick={changeCurrentCategory}
                className={`${
                  category === val.id ? "target-button" : "button"
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
