import { Link, useMatch } from "react-router-dom";

const PostTab = ({ pathName }) => {
  const { pathname } = useMatch(pathName);
  return (
    <div className="flex justify-center gap-10 font-bold text-main text-xl mb-10 ">
      <div className="border-y-2 w-[400px] flex justify-center gap-20 border-main">
        <Link to={"/subscribe"}>
          <span className={`${pathname !== "/subscribe" && "opacity-40"}`}>
            My
          </span>
        </Link>
        <Link
          to={`/${
            localStorage.getItem("postCategory")
              ? `?category=${localStorage.getItem("postCategory")}`
              : ""
          }`}
        >
          <span className={`${pathname !== "/" && "opacity-40"}`}>Others</span>
        </Link>
      </div>
    </div>
  );
};

export default PostTab;
