import { createContext, useReducer, useState } from "react";

const PostContext = createContext({
  postInfo: {},
  getPostInfo: () => {},
  categoryList: [],
  currentCategory: "",
  setCurrentCategory: () => {},
});

const postInfoReducer = (state, { type, val }) => {
  let copyState = JSON.parse(JSON.stringify(state));
  switch (type) {
    case "UPDATE_POST":
      copyState = val;
      return copyState;
    default:
      return null;
  }
};

export const PostProvider = (props) => {
  const [currentCategory, setCurrentCategory] = useState(
    localStorage.getItem("category") ?? "FREE"
  );
  const categoryList = [
    { id: "RECIPE", category: "레시피" },
    { id: "RECOMMEND", category: "맛집 추천" },
    { id: "FREE", category: "자유" },
  ];
  const [postInfo, dispatchPostInfo] = useReducer(postInfoReducer, {});

  const getPostInfo = (postObj) => {
    dispatchPostInfo({
      type: "UPDATE_POST",
      val: postObj,
    });
  };

  return (
    <PostContext.Provider
      value={{
        getPostInfo,
        postInfo,
        categoryList,
        setCurrentCategory,
        currentCategory,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostContext;
