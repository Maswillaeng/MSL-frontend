import { useRef } from "react";
import { useState } from "react";
import useFindOpenBarAndClose from "../hooks/useFindOpenBarAndClose";
import DropDown from "./UI/DropDown";

const categoryList = [
  { id: "RECIPE", category: "레시피" },
  { id: "BAR_SNACK", category: "안주 추천" },
  { id: "FREE", category: "자유" },
];

const PostFooter = ({ categoryId, setCategoryId }) => {
  const [openButtonText, setOpenButtonText] = useState("카테고리");
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useFindOpenBarAndClose(dropDownRef, false);

  const changeCategory = (e) => {
    setCategoryId(e.target.id);
    setOpenButtonText(e.target.innerText);
  };
  return (
    <footer className="flex fixed left-0 bottom-0 w-screen bg-sub h-16 ">
      <div className="flex justify-end w-full items-center gap-10 px-10">
        <label className="relative">
          <DropDown
            openButtonText={openButtonText}
            dropDownRef={dropDownRef}
            setIsOpen={setIsOpen}
          />
          {isOpen ? (
            <ul className="absolute z-50 bg-sub rounded-[5px] -top-36 left-3 text-center break-keep">
              {categoryList.map((ele) => (
                <li
                  id={ele.id}
                  onClick={changeCategory}
                  className={`${
                    categoryId === ele.id ? "bg-red-200" : "hover:bg-red-200"
                  } pointer text-main`}
                  key={ele.id}
                >
                  {ele.category}
                </li>
              ))}
            </ul>
          ) : null}
        </label>
        <button
          type="submit"
          className="submit-button bg-main rounded-full w-[100px] h-10 text-sub"
        >
          완료
        </button>
      </div>
    </footer>
  );
};

export default PostFooter;
