import { useRef, useState } from "react";
import useFindOpenBarAndClose from "../../hooks/useFindOpenBarAndClose";
import DropDown from "./DropDown";

const categoryList = [
  { id: "RECIPE", category: "레시피" },
  { id: "BAR_SNACK", category: "안주 추천" },
  { id: "FREE", category: "자유" },
];

const PostOption = ({ tagList, setTagList, categoryId, setCategoryId }) => {
  const dropDownRef = useRef(null);
  const tagRef = useRef(null);
  const [isOpenTagGuide, setIsOpenTagGuid] = useState(false);
  const [openButtonText, setOpenButtonText] = useState("카테고리");
  const [isOpen, setIsOpen] = useFindOpenBarAndClose(dropDownRef, false);

  const createTag = (e) => {
    const { value } = tagRef?.current;
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      console.log(value, tagList);
      if (!tagList.find((ele) => ele === value)) {
        setTagList((prevList) => [...prevList, value]);
      }

      tagRef.current.value = "";
    }
    if (e.key === "Backspace") {
      if (value === "") {
        setTagList((prevList) => prevList.slice(0, prevList.length - 1));
      }
    }
  };

  const deleteTag = (e) => {
    const { id } = e.target;
    const findIndex = tagList.findIndex((ele) => ele === id);

    setTagList((prevList) => {
      const copyTagList = [...prevList];
      copyTagList.splice(findIndex, 1);
      return copyTagList;
    });
  };

  const showWritingMethodOfTag = () => {
    setIsOpenTagGuid(true);
  };
  const hideWritingMethodOfTag = () => {
    setIsOpenTagGuid(false);
  };

  const changeCategory = (e) => {
    setCategoryId(e.target.id);
    setOpenButtonText(e.target.innerText);
  };
  return (
    <div className="flex gap-3 items-center flex-wrap relative">
      {tagList.length > 0 &&
        tagList.map((element) => (
          <div
            id={element}
            onClick={deleteTag}
            className="hashtag"
            key={element}
          >
            {element}
          </div>
        ))}
      <input
        onFocus={showWritingMethodOfTag}
        onBlur={hideWritingMethodOfTag}
        className="outline-none h-10"
        ref={tagRef}
        onKeyDown={createTag}
        placeholder="태그를 입력하세요"
      />
      {isOpenTagGuide && (
        <div className="float-left absolute top-10 z-50 bg-main rounded-[2px] text-sub text-sm p-2">
          쉼표 혹은 엔터를 입력하여 태그를 등록 할 수 있습니다.
          <br />
          등록된 태그를 클릭하면 삭제됩니다.
        </div>
      )}
      <label className="relative">
        <DropDown
          openButtonText={openButtonText}
          dropDownRef={dropDownRef}
          setIsOpen={setIsOpen}
        />
        {isOpen ? (
          <ul className="absolute z-50 bg-sub rounded-[5px] top-8 left-2 text-center break-keep">
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
    </div>
  );
};

export default PostOption;
