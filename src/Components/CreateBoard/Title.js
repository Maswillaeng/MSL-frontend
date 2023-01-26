import { useEffect } from "react";
import "../../styles/input.css";

const Title = ({ title, setTitle }) => {
  const userTypingTitle = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  useEffect(() => {
    const saveTitle = setTimeout(() => {
      localStorage.setItem("title", title);
    }, 2000);
    return () => {
      clearTimeout(saveTitle);
    };
  }, [title]);

  return (
    <div className="border-b-2 mb-8 border-main">
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

export default Title;
