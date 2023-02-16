const PostMain = ({ title, content }) => {
  return (
    <>
      <div className="w-full text-5xl weight font-bold mt-3 break-all border-b-2 border-main pb-5">
        {title}
      </div>
      <div
        className="w-full break-keep h-auto mt-5  border-b-2 border-main pb-5"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </>
  );
};

export default PostMain;
