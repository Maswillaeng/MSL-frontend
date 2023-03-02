import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../Components/Header";

const Search = () => {
  const searchPost = () => {};
  return (
    <>
      <Header />
      <div className="text-center mt-20">
        <label className="border-2 border-main p-3">
          <FontAwesomeIcon
            className="w-[18px] h-[18px] text-main mr-5"
            icon={faMagnifyingGlass}
          />
          <input
            onChange={searchPost}
            className="w-2/3 outline-none"
            placeholder="검색어를 입력하세요"
          />
        </label>
      </div>
    </>
  );
};

export default Search;
