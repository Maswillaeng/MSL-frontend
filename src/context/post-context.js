import { createContext, useReducer } from "react";

const PostContext = createContext({
  postInfo: {},
  getPostInfo: () => {},
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
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostContext;
