import { Link } from "react-router-dom";

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
      <div
        className="w-full break-keep h-auto mt-5  border-b-2 border-main pb-5"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </>
  );
};

export default PostMain;
