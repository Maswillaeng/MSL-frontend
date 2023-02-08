const Category = ({ categoryList }) => {
  return (
    <>
      <ul className="flex items-center gap-7">
        {categoryList.map((val) => (
          <li id={val} className="cursor-pointer" key={val}>
            <button className="button">{val}</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Category;
