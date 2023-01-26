const ModifyTitle = ({ title, setSubmitTitle }) => {
  const userTypingTitle = (e) => {
    const { value } = e.target;
    setSubmitTitle(value);
  };
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

export default ModifyTitle;
