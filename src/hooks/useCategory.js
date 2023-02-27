import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useCategory = (keyValue) => {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(
    localStorage.getItem(keyValue) ?? ""
  );

  useEffect(() => {
    setCategory(searchParams.get("category") ?? "");
    localStorage.setItem(keyValue, searchParams.get("category") ?? "");
  }, [searchParams, keyValue]);

  const changeCurrentCategory = (e) => {
    const { id } = e.target.closest(".category");
    setCategory(id);
    localStorage.setItem(keyValue, id);
  };

  return { category, changeCurrentCategory };
};

export default useCategory;
