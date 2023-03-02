const PostFooter = ({ submitPost }) => {
  return (
    <footer className="flex fixed left-0 bottom-0 w-screen bg-sub h-16 ">
      <div className="flex justify-end w-full items-center gap-10 px-10">
        <button
          onClick={submitPost}
          className="submit-button bg-main rounded-full w-[100px] h-10 text-sub"
        >
          완료
        </button>
      </div>
    </footer>
  );
};

export default PostFooter;
