import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostDetailFetch, updatePostFetch } from "../api/postFetch";
import Header from "../Components/Header";
import PostContent from "../Components/PostContent";
import PostFooter from "../Components/PostFooter";
import PostTitle from "../Components/PostTitle";

const ModifyBoard = () => {
  const { postId } = useParams();
  const navigation = useNavigate();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const getUploadImageArray = (imageArray) => {
    if (imageArray.length > 0) {
      setThumbnail(imageArray[0]);
    }
  };

  const editorToHtml = draftToHtml(
    convertToRaw(editorState.getCurrentContent())
  );

  const submitUpdatePost = async (e) => {
    e.preventDefault();
    if (title === "") {
      alert("제목을 입력해주세요");
      return;
    }
    if (categoryId === "") {
      alert("카테고리를 설정해주세요");
    }
    await updatePostFetch(thumbnail, title, editorToHtml, postId, categoryId);
    navigation(`/post/detail/${postId}`);
  };

  const changeHtmlToDraft = (content) => {
    const blocksFromHtml = htmlToDraft(content);

    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(editorState);
  };

  useEffect(() => {
    const getPostData = async () => {
      const { data } = await getPostDetailFetch(postId);

      setTitle(data.title);
      changeHtmlToDraft(data.content);
    };
    getPostData();
  }, [postId]);

  return (
    <>
      <Header />
      <div className={`pt-5 min-w-[1000px]  mx-20 flex justify-center`}>
        <form className="flex flex-col w-7/12" onSubmit={submitUpdatePost}>
          <PostTitle title={title} setSubmitTitle={setTitle} />
          <PostContent
            editorState={editorState}
            setEditorState={setEditorState}
            editorToHtml={editorToHtml}
            getUploadImageArray={getUploadImageArray}
          />
          <PostFooter categoryId={categoryId} setCategoryId={setCategoryId} />
        </form>
      </div>
    </>
  );
};

export default ModifyBoard;
