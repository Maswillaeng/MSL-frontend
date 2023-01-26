import { useState } from "react";
import Button from "../UI/Button";
import "../../styles/input.css";

const Category = () => {
  const [category] = useState(["전체", "레시피", "술 추천", "자유 주제"]);
  const [currentCategoryTarget, setCurrentCategoryTarget] = useState("전체");

  const clickCategoryBtn = (e) => {
    setCurrentCategoryTarget(e.target.textContent);
  };
  return (
    <ul className="flex items-center gap-7">
      {category.map((val) => (
        <li
          id={val}
          className="cursor-pointer"
          onClick={clickCategoryBtn}
          key={val}
        >
          <Button target={currentCategoryTarget} text={val} />
        </li>
      ))}
    </ul>
  );
};

export default Category;
