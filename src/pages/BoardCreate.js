import Header from "../Components/Header";
import React, { useContext, useEffect, useState } from "react";
import "../styles/input.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom";
import Title from "../Components/CreateBoard/Title";
import Content from "../Components/CreateBoard/Content";
import draftToHtml from "draftjs-to-html";
import { createPostFetch } from "../api/postFetch";
import Loading from "../Components/Loading";
import UserContext from "../context/user-context";

const BoardCreate = () => {
  const { userInfo } = useContext(UserContext);
  const navigation = useNavigate();
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isLoading, setIsLoading] = useState(false);

  const editorToHtml = draftToHtml(
    convertToRaw(editorState.getCurrentContent())
  );

  const submitPostData = async (e) => {
    e.preventDefault();
    if (title === "") {
      alert("제목을 입력해주세요");
      return;
    }
    setIsLoading(true);
    await createPostFetch("정채운", title, editorToHtml);
    setIsLoading(false);
    localStorage.clear();
    navigation(`/users/${userInfo.nickName}`);
  };

  useEffect(() => {
    const title = localStorage.getItem("title") ?? "";
    const content = localStorage.getItem("content") ?? "<p></p> ";
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
        <form className="flex flex-col w-7/12" onSubmit={submitPostData}>
          <div>
            <Title title={title} setTitle={setTitle} />
            <Content
              editorState={editorState}
              setEditorState={setEditorState}
              editorToHtml={editorToHtml}
            />
          </div>
          <footer className="fixed left-0 bottom-0 w-screen bg-sub h-16 ">
            <button
              type="submit"
              className="submit-button absolute right-12 bg-main rounded-full w-[100px] h-10 text-sub mt-3"
            >
              완료
            </button>
          </footer>
        </form>
      </div>
      {isLoading ? <Loading /> : null}
    </>
  );
};

export default BoardCreate;
