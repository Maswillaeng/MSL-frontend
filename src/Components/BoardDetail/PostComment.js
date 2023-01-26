const PostComment = ({ nickName }) => {
  const submitComment = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full mt-10">
      <ul className="border-2 border-main basis-[100%] px-14 py-10 rounded-[10px] w-full max-h-[400px] h-auto">
        <li className="flex">
          <div className="max-w-[30px] max-h-[30px] min-w-[30px] min-h-[30px] mr-2 profile_img"></div>
          <div className="flex flex-col">
            <ul className="flex gap-3">
              <li className="text-[5px]">{nickName}</li>
              <li className="text-[5px]">작성일자</li>
            </ul>
            <div>댓글</div>
          </div>
        </li>
      </ul>
      <form
        className="flex flex-col justify-between mt-10"
        onSubmit={submitComment}
      >
        <textarea
          id="comment"
          className="border-2 border-main basis-[100%] p-5 rounded-[10px] w-full h-auto outline-none resize-none scroll-m-80 overflow-y-scroll"
          placeholder="댓글 입력"
        ></textarea>
        <div className="self-end m-5">
          <button type="submit" className="button">
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostComment;
