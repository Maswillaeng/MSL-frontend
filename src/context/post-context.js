import { createContext, useReducer } from "react";

const PostContext = createContext({
  postInfo: {},
  updatePostInfo: () => {},
});

const postInfoReducer = (state, { type, val }) => {
  const copyState = JSON.parse(JSON.stringify(state));
  switch (type) {
    case "UPDATE_POST":
      copyState.nickName = val.nickName;
      copyState.title = val.title;
      copyState.content = val.content;
      return copyState;
    default:
      return null;
  }
};

export const PostProvider = (props) => {
  const [postInfo, dispatchPostInfo] = useReducer(postInfoReducer, {
    nickName: "",
    title: "",
    content: "",
  });

  const updatePostInfo = (nickName, title, content) => {
    dispatchPostInfo({
      type: "UPDATE_POST",
      val: { nickName, title, content },
    });
  };

  return (
    <PostContext.Provider value={{ updatePostInfo, postInfo }}>
      {props.children}
    </PostContext.Provider>
  );
};

export default PostContext;
