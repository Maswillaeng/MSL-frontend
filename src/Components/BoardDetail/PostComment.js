import basicProfile from "../../assets/basic_profile.jpg";
import { changeDateFormat } from "../../utility/chage-format";

const PostComment = ({ commentObj }) => {
  const { commentNumber, commentList } = commentObj;
  const submitComment = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full mt-10">
      <div>
        <span className="mr-5">댓글 {commentNumber}개</span>
        <label htmlFor="sortComment">
          <select id="sortComment" name="정렬기준">
            <option>인기 댓글순</option>
            <option>최신순</option>
          </select>
        </label>
      </div>
      <form
        className="flex flex-col justify-between mt-10"
        onSubmit={submitComment}
      >
        <div className="flex">
          <img
            className="max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] mr-2 rounded-full"
            alt="사용자 프로필 이미지"
            src={basicProfile}
          />
          <textarea
            id="comment"
            className="border-b-2 border-main outline-none resize-none w-full h-auto"
            placeholder="댓글 입력"
          ></textarea>
        </div>
        <div className="self-end m-5">
          <button type="submit" className="button">
            등록
          </button>
        </div>
      </form>
      <ul className="w-full">
        {commentList.map((ele) => (
          <li key={ele.id} className="flex mb-5">
            <img
              className="max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] mr-2 rounded-full"
              alt="해당 댓글 유저이미지"
              src={basicProfile}
            />
            <div className="flex flex-col">
              <ul className="flex gap-3">
                <li className="text-[5px]">{ele.nickName}</li>
                <li className="text-[5px]">
                  {changeDateFormat(ele.createdAt, {
                    year: "2-digit",
                    month: "long",
                    day: "2-digit",
                  })}
                </li>
              </ul>
              <div>{ele.content}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostComment;
