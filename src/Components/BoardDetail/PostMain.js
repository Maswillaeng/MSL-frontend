import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.bubble.css";

const PostMain = ({ title, content, tagList }) => {
  return (
    <>
      <div className="w-full text-5xl weight font-bold mt-3 break-all border-b-2 border-main pb-5">
        <span>{title}</span>
        <div className="text-base flex flex-wrap items-center gap-3 font-normal">
          {tagList.map((element) => (
            <Link to={`/tags/${element}`} className="hashtag" key={element}>
              {element}
            </Link>
          ))}
        </div>
      </div>
      <ReactQuill value={content} readOnly={true} theme={"bubble"} />
    </>
  );
};

export default PostMain;
