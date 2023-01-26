import { Editor } from "react-draft-wysiwyg";
import { useEffect } from "react";
import { useState } from "react";

const Content = ({ editorState, setEditorState, editorToHtml }) => {
  const [uploadedImage, setUploadedImages] = useState([]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const uploadImageCallBack = (file) => {
    let uploadedImages = uploadedImage;
    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    };
    uploadedImages.push(imageObject);
    setUploadedImages(uploadedImages);

    return new Promise((resolve, reject) => {
      resolve({ data: { link: imageObject.localSrc } });
    });
  };
  //사용자가 이미지를 업로드 해서 그럼 배열에 쌓이겠지 다시 불러올 때
  console.log(uploadedImage);

  useEffect(() => {
    const saveContent = setTimeout(() => {
      localStorage.setItem("content", editorToHtml);
    }, 2000);
    return () => {
      clearTimeout(saveContent);
    };
  }, [editorToHtml]);
  return (
    <div>
      <Editor
        toolbarStyle={{ top: 0, zIndex: "1000" }}
        editorStyle={{
          overflowY: "scroll",
          minHeight: "450px",
          height: "auto",
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
            defaultSize: { width: 100, height: 100 },
            alt: { present: true, mandatory: true },
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
