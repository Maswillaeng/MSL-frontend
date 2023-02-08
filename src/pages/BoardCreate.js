import Header from "../Components/Header";
import React, { useEffect, useState } from "react";
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

const BoardCreate = () => {
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
    navigation("/");
  };

  //로컬스토리지에 데이터가 있으면 물어보기 없다면 리턴
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
      <div>
        <Header />
        <div className="min-w-[900px]">
          <form
            className="mt-20 mx-[200px] overflow-hidden"
            onSubmit={submitPostData}
          >
            <Title title={title} setTitle={setTitle} />
            <Content
              editorState={editorState}
              setEditorState={setEditorState}
              editorToHtml={editorToHtml}
            />
            <footer className="absolute left-0 bottom-0 bg-sub w-screen h-16">
              <button
                type="submit"
                className="submit-button absolute right-12 bg-main rounded-full w-[100px] h-10 text-sub mt-3"
              >
                완료
              </button>
            </footer>
          </form>
        </div>
      </div>
      {isLoading ? <Loading /> : null}
    </>
  );
};

export default BoardCreate;
