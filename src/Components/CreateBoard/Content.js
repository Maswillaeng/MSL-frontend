import { Editor } from "react-draft-wysiwyg";
import { useEffect } from "react";
import { changeImgFormat } from "../../api/postFetch";

const Content = ({ editorState, setEditorState, editorToHtml }) => {
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const uploadImageCallBack = async (file) => {
    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    };
    const data = await changeImgFormat(imageObject);

    return new Promise((resolve, reject) => {
      resolve({
        data: {
          link: data.imgSrc,
        },
      });
    });
  };

  useEffect(() => {
    const saveContent = setTimeout(() => {
      localStorage.setItem("content", editorToHtml);
    }, 1500);
    return () => {
      clearTimeout(saveContent);
    };
  }, [editorToHtml]);
  return (
    <div className="hover:cursor-text">
      <Editor
        toolbarStyle={{ top: 0, zIndex: "10" }}
        wrapperStyle={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        editorStyle={{
          width: "100%",
          height: "400px",
        }}
        wrapperClassName="wrapper-class"
        editorClassName="editor"
        toolbarClassName="toolbar-class"
        toolbar={{
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false },
          image: {
            uploadCallback: uploadImageCallBack,
            uploadEnabled: true,
            previewImage: true,
            defaultSize: { width: "100%", height: "auto" },
          },
        }}
        placeholder="내용을 작성해주세요."
        localization={{
          locale: "ko",
        }}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default Content;
