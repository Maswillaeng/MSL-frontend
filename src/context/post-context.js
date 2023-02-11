import { createContext, useReducer } from "react";

const PostContext = createContext({
  postInfo: {},
  getPostInfo: () => {},
});

const postInfoReducer = (state, { type, val }) => {
  const copyState = JSON.parse(JSON.stringify(state));
  switch (type) {
    case "UPDATE_POST":
      copyState.nickName = val.nickName;
      copyState.title = val.title;
      copyState.content = val.content;
      copyState.userImage = val.userImage ?? copyState.userImage;
      copyState.createdAt = val.createdAt;
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
    userImage: "",
    createdAt: "",
  });

  const getPostInfo = (nickName, title, content, userImage, createdAt) => {
    dispatchPostInfo({
      type: "UPDATE_POST",
      val: { nickName, title, content, userImage, createdAt },
    });
  };

  return (
    <PostContext.Provider value={{ getPostInfo, postInfo }}>
      {props.children}
    </PostContext.Provider>
  );
};

export default PostContext;
