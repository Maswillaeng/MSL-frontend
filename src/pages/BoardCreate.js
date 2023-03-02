import Header from "../Components/Header";
import React, { useContext, useEffect, useState } from "react";
import "../styles/input.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom";
import draftToHtml from "draftjs-to-html";
import { createPostFetch } from "../api/postFetch";
import Loading from "../Components/Loading";
import UserContext from "../context/user-context";
import PostFooter from "../Components/PostFooter";
import PostContent from "../Components/PostContent";
import PostTitle from "../Components/PostTitle";
import PostOption from "../Components/UI/PostOption";

const BoardCreate = () => {
  const { userInfo } = useContext(UserContext);
  const navigation = useNavigate();
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [tagList, setTagList] = useState([]);

  const getUploadImageArray = (imageArray) => {
    if (imageArray.length > 0) {
      setThumbnail(imageArray[0]);
    }
  };

  const editorToHtml = draftToHtml(
    convertToRaw(editorState.getCurrentContent())
  );

  const submitPostData = async (e) => {
    e.preventDefault();
    if (title === "") {
      alert("제목을 입력해주세요");
      return;
    }
    if (categoryId === "") {
      alert("카테고리를 설정해주세요");
      return;
    }
    setIsLoading(true);
    await createPostFetch(
      userInfo.nickName,
      title,
      editorToHtml,
      categoryId,
      thumbnail,
      tagList
    );
    setIsLoading(false);
    localStorage.removeItem("createTitle");
    localStorage.removeItem("createContent");
    navigation(`/users/${userInfo.userId}`);
  };

  useEffect(() => {
    const title = localStorage.getItem("createTitle") ?? "";
    const content = localStorage.getItem("createContent") ?? "<p></p> ";
    const blocksFromHtml = htmlToDraft(content);

    let userAnswer;
    if (title.length !== 0 || content !== `<p></p>${content[7]}`) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorState = EditorState.createWithContent(contentState);
      userAnswer = window.confirm(
        "작성 중인 글이 있어요.\n글을 이어서 쓰시겠어요?"
      );
      if (userAnswer) {
        setTitle(title);
        setEditorState(editorState);
      }
    }
  }, []);

  return (
    <>
      <Header />
      <div className={`pt-5 min-w-[1000px]  mx-20 flex justify-center`}>
        <div className="flex flex-col w-7/12" onSubmit={submitPostData}>
          <div>
            <PostTitle
              title={title}
              setTitle={setTitle}
              localStorageKey="createTitle"
            />
            <PostOption
              tagList={tagList}
              setTagList={setTagList}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
            />
            <PostContent
              editorState={editorState}
              setEditorState={setEditorState}
              editorToHtml={editorToHtml}
              getUploadImageArray={getUploadImageArray}
              localStorageKey="createContent"
            />
          </div>
          <PostFooter submitPost={submitPostData} />
        </div>
      </div>
      {isLoading ? <Loading /> : null}
    </>
  );
};

export default BoardCreate;
