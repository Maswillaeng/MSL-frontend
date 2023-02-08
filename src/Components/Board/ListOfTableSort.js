import { useState } from "react";
import "../../styles/input.css";

const ListOfTableSort = () => {
  const [tableSortList] = useState([
    "번호",
    "카테고리",
    "제목",
    "작성자",
    "작성일",
  ]);
  return (
    <div className="border-y-2 text-center mb-5 mt-7 border-main text-main">
      <ul className="grid grid-cols-[50px_100px_minmax(200px,_1fr)_100px_100px]">
        {tableSortList.map((val) => (
          <li key={val}>{val}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListOfTableSort;
