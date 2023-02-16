import Header from "../Components/Header";
import React, { useContext, useEffect, useRef, useState } from "react";
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
import DropDown from "../Components/UI/DropDown";
import useFindOpenBarAndClose from "../hooks/useFindOpenBarAndClose";
import PostContext from "../context/post-context";

const openButtonText = "카테고리 설정";

const BoardCreate = () => {
  const { userInfo } = useContext(UserContext);
  const { categoryList } = useContext(PostContext);
  const navigation = useNavigate();
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isLoading, setIsLoading] = useState(false);
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useFindOpenBarAndClose(dropDownRef, false);
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
    await createPostFetch(userInfo.nickName, title, editorToHtml, categoryId);
    setIsLoading(false);
    localStorage.clear();
    navigation(`/users/${userInfo.nickName}`);
  };

  const changeCategory = (e) => {
    setCategoryId(e.target.id);
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
          <footer className="flex fixed left-0 bottom-0 w-screen bg-sub h-16 ">
            <label className="relative">
              <DropDown
                openButtonText={openButtonText}
                dropDownRef={dropDownRef}
                setIsOpen={setIsOpen}
              />
              {isOpen ? (
                <ul className="absolute z-20 bg-sub rounded-[5px] -top-36 left-3 text-center break-keep">
                  {categoryList.map((ele) => (
                    <li
                      id={ele.id}
                      onClick={changeCategory}
                      className={`${
                        categoryId === ele.id
                          ? "bg-red-200"
                          : "hover:bg-red-200"
                      } pointer`}
                      key={ele.id}
                    >
                      {ele.category}
                    </li>
                  ))}
                </ul>
              ) : null}
            </label>
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
