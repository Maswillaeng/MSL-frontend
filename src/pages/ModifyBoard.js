import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostDetailFetch, updatePostFetch } from "../api/postFetch";
import Header from "../Components/Header";
import ModifyContent from "../Components/ModifyBoard/ModifyContent";
import ModifyTitle from "../Components/ModifyBoard/ModifyTitle";
import PostContext from "../context/post-context";

//컴포넌트 최적화 onChange => ref

const ModifyBoard = () => {
  const postCtx = useContext(PostContext);
  const { title, content, userImage } = postCtx.postInfo;
  const { postId } = useParams();
  const navigation = useNavigate();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [submitTitle, setSubmitTitle] = useState("");

  useEffect(() => {
    const getPostData = async () => {
      const { nickName, title, content, userImage } = await getPostDetailFetch(
        postId
      );
      postCtx.getPostInfo(nickName, title, content, userImage);
    };
    getPostData();
  }, [postId]);

  useEffect(() => {
    const blocksFromHtml = htmlToDraft(content);

    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(editorState);
    setSubmitTitle(title);
  }, [content, title]);

  const submitUpdatePost = async (e) => {
    e.preventDefault();
    const editorToHtml = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    if (!submitTitle) {
      alert("제목을 입력해주세요");
      return;
    }
    await updatePostFetch(
      "정채운",
      submitTitle,
      editorToHtml,
      postId,
      userImage
    );
    navigation(`/post/detail/${postId}`);
  };
  return (
    <div>
      <Header />
      <div>
        <form
          className="mt-20 mx-[200px] overflow-hidden"
          onSubmit={submitUpdatePost}
        >
          <ModifyTitle title={submitTitle} setSubmitTitle={setSubmitTitle} />
          <ModifyContent
            editorState={editorState}
            setEditorState={setEditorState}
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
  );
};

export default ModifyBoard;
