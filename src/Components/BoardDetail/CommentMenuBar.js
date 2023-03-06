import { useRef } from "react";
import useFindOpenBarAndClose from "../../hooks/useFindOpenBarAndClose";
import DropDown from "../UI/DropDown";

const CommentMenuBar = ({
  element,
  userInfo,
  menuButtonText,
  editComment,
  deleteComment,
}) => {
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useFindOpenBarAndClose(dropDownRef, false);
  return (
    <div className="mt-3">
      {userInfo.nickName === element.nickName ? (
        <label className="relative" htmlFor="sortComment">
          <DropDown
            openButtonText={menuButtonText}
            dropDownRef={dropDownRef}
            setIsOpen={setIsOpen}
          />
          {isOpen ? (
            <ul className="absolute z-20 bg-sub rounded-[5px] top-8 -left-1 text-center break-keep">
              {userInfo.nickName === element.nickName ? (
                <>
                  <li className="pointer" onClick={editComment}>
                    수정
                  </li>
                  <li className="pointer" onClick={deleteComment}>
                    삭제
                  </li>
                </>
              ) : null}
            </ul>
          ) : null}
        </label>
      ) : null}
    </div>
  );
};

export default CommentMenuBar;
