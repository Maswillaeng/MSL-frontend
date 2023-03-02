import { useEffect } from "react";

const PostTitle = ({ title, setTitle, localStorageKey }) => {
  const userTypingTitle = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  useEffect(() => {
    const saveTitle = setTimeout(() => {
      localStorage.setItem(localStorageKey, title);
    }, 1500);
    return () => {
      clearTimeout(saveTitle);
    };
  }, [title]);

  return (
    <div className="border-b-2 mb-3 border-main">
      <textarea
        onChange={userTypingTitle}
        className="w-full h-14 pl-4 pt-1 text-2xl border-main resize-none outline-none"
        id="title"
        placeholder="제목"
        value={title}
      ></textarea>
    </div>
  );
};

export default PostTitle;
