import basicProfile from "../../assets/basic_thumbnail.png";

const EditComment = ({
  submitComment,
  userInfo,
  commentRef,
  element,
  setEditMode,
}) => {
  return (
    <form
      className="flex flex-col justify-between mt-10 w-full"
      onSubmit={submitComment}
    >
      <div className="flex">
        <img
          className="max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] mr-2 rounded-full"
          alt="사용자 프로필 이미지"
          src={userInfo.userImage || basicProfile}
        />
        <textarea
          ref={commentRef}
          defaultValue={element.content}
          id="comment"
          className="border-b-2 border-main outline-none resize-none w-full h-auto overflow-auto"
          placeholder="댓글 입력"
        ></textarea>
      </div>
      <div className="flex gap-5 self-end m-5">
        <button
          onClick={() => setEditMode(false)}
          id="addCommentButton"
          type="button"
          className="button"
        >
          취소
        </button>
        <button id="addCommentButton" type="submit" className="button">
          저장
        </button>
      </div>
    </form>
  );
};

export default EditComment;
