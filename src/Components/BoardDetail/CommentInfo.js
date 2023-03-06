import { changeDateFormat } from "../../utility/chage-format";

const CommentInfo = ({ element, toggleCommentBox, isOpenComment }) => {
  return (
    <>
      <ul className="flex gap-3">
        <li className="text-[5px]">{element.nickName}</li>
        <li className="text-[5px]">
          {changeDateFormat(element.createAt, {
            year: "2-digit",
            month: "long",
            day: "2-digit",
          })}
        </li>
      </ul>
      <div>
        {element?.content.length > 150 ? (
          <>
            <div className="break-all">
              {isOpenComment
                ? element.content
                : `${element.content.slice(0, 149)}...`}
            </div>
            <button onClick={toggleCommentBox} className="text-sm">
              {isOpenComment ? "간략히" : "펼치기"}
            </button>
          </>
        ) : (
          element.content
        )}
      </div>
    </>
  );
};

export default CommentInfo;
