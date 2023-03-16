import React, { useRef, useState } from "react";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { changeImgFormat } from "../api/postFetch";

function PostContent({
  getUploadImageArray,
  editorValue,
  setEditorValue,
  localStorageKey,
}) {
  const quillRef = useRef(null);
  const [uploadImages] = useState([]);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("photo", file);

    const data = await changeImgFormat(formData);
    uploadImages.push(`${process.env.REACT_APP_BASE_URL}${data.img}`);

    getUploadImageArray(uploadImages);
    const image = `${process.env.REACT_APP_BASE_URL}${data.img}`;
    return image;
  };

  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: () => {
            console.log(quillRef?.current.getEditor().getContents());
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.setAttribute("style", "display: none;");
            document.body.appendChild(input);

            input.onchange = async () => {
              const file = input.files[0];
              const imageUrl = await uploadImage(file);
              const range = quillRef.current.getEditor().getSelection();
              quillRef.current
                .getEditor()
                .insertEmbed(range.index, "image", imageUrl);

              input.value = "";
              document.body.removeChild(input);
            };

            input.click();
          },
        },
      },
    }),
    []
  );

  const changeEditorValue = (e) => {
    setEditorValue(e);
  };

  useEffect(() => {
    const saveContent = setTimeout(() => {
      localStorage.setItem(localStorageKey, editorValue);
    }, 1500);
    return () => {
      clearTimeout(saveContent);
    };
  }, [editorValue, localStorageKey]);
  return (
    <ReactQuill
      className="h-[400px]"
      value={editorValue}
      onChange={changeEditorValue}
      ref={quillRef}
      theme="snow"
      modules={modules}
    />
  );
}

export default PostContent;
