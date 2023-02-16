const DropDown = ({ openButtonText, dropDownRef, setIsOpen }) => {
  return (
    <div
      ref={dropDownRef}
      id="menuButton"
      onClick={() => setIsOpen((prev) => !prev)}
      className="cursor-pointer"
      dangerouslySetInnerHTML={{ __html: openButtonText }}
    ></div>
  );
};

export default DropDown;
