const PostMain = ({ contentRef, title }) => {
  return (
    <>
      <div className="w-full text-4xl weight font-bold mt-10">{title}</div>
      <div ref={contentRef} className="w-full break-keep h-auto mt-10"></div>
    </>
  );
};

export default PostMain;
