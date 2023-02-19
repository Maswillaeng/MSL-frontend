import { useState } from "react";

const useCategory = (keyValue) => {
  const [category, setCategory] = useState(
    localStorage.getItem(keyValue) ?? ""
  );

  const changeCurrentCategory = (e) => {
    const { id } = e.target.closest(".category");
    setCategory(id);
    localStorage.setItem(keyValue, id);
  };

  return { category, changeCurrentCategory };
};

export default useCategory;
