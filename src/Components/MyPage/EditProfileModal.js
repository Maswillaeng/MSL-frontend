import { useContext, useRef, useState } from "react";
import {
  checkNickNameOverlapFetch,
  editProfileFetch,
} from "../../api/userFetch";
import { nickNameRule } from "../../utility/input-rules";
import Loading from "../Loading";
import basicProfile from "../../assets/basic_profile.jpg";
import SignInputContext from "../../context/check-signInput-context";

const EditProfileModal = ({
  userImage,
  introduction,
  nickName,
  setModal,
  userId,
}) => {
  const [editUserImage, setEditUserImage] = useState(userImage);
  const { info, updateNickNameInfo } = useContext(SignInputContext);
  const {
    nickNameInfo: { isValid, error },
  } = info;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const nickNameRef = useRef(null);
  const introductionRef = useRef(null);

  const touchedInput = () => {
    const { value } = nickNameRef?.current;

    if (value === "") {
      setErrorMessage("닉네임을 입력하세요");
      updateNickNameInfo(false, true);
      return;
    } else if (!nickNameRule.test(value)) {
      setErrorMessage("닉네임 형식이 올바르지 않습니다.");
      updateNickNameInfo(false, true);
      return;
    }

    checkOverlapNickName();
  };

  const checkOverlapNickName = async () => {
    const { value } = nickNameRef.current;
    try {
      const response = await checkNickNameOverlapFetch(value);
      if (response.ok) {
        updateNickNameInfo(true, false);
      } else {
        updateNickNameInfo(false, true);
        throw new Error("중복된 넥네임 입니다.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const changeProfileImg = (e) => {
    let reader = new FileReader();

    reader.onload = (e) => {
      setEditUserImage(e.target.result);
      console.log(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const submitEditProfile = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    const { value: editNickName } = nickNameRef?.current;
    const { value: editIntroduction } = introductionRef?.current;

    setIsLoading(true);
    try {
      const response = await editProfileFetch(
        editUserImage,
        editNickName,
        editIntroduction
      );
      if (response.ok) {
        setModal(false);
        window.location.replace(`/users/${userId}`);
      } else {
        throw new Error("중복된 닉네임 입니다.");
      }
    } catch (error) {
      alert(error.message);
    }
    setIsLoading(false);
  };
  return (
    <>
      <div
        onClick={(e) => {
          if (!e.target.closest(".modal")) {
            setModal(false);
          }
        }}
        className="flex justify-center items-center  bg-[rgba(0,0,0,0.3)] absolute top-0 left-0 w-full h-full z-50"
      >
        <div className="modal relative flex flex-col items-center w-[400px] h-[350px] bg-main rounded-[10px]">
          <h1 className="text-sub text-3xl font-bold mt-5">프로필 수정</h1>
          <form
            onSubmit={submitEditProfile}
            className="flex w-full h-full justify-center mt-10"
          >
            <div className="flex flex-col  gap-3">
              <img
                className="w-[70px] h-[70px] rounded-full object-center object-cover"
                alt="유저 프로필 이미지"
                src={`${editUserImage || basicProfile}`}
              />
              <label
                className="text-sub border-2 border-sub rounded-[3px] cursor-pointer"
                htmlFor="profileImg"
              >
                사진 변경
                <input
                  className="whitespace-nowrap w-0 p-0 overflow-hidden h-0 border-0"
                  type="file"
                  id="profileImg"
                  accept="image/png, image/jpeg"
                  onChange={changeProfileImg}
                />
              </label>
            </div>
            <div className="flex flex-col gap-5 ml-10">
              <label id="nickName">
                <input
                  placeholder="닉네임"
                  type="text"
                  id="nickName"
                  minLength="3"
                  maxLength="8"
                  className={`bg-sub rounded-[4px] outline-none p-2 border-2 ${
                    isValid ? "border-green-600" : "border-red-600"
                  }`}
                  autoComplete="off"
                  ref={nickNameRef}
                  onBlur={touchedInput}
                  defaultValue={nickName}
                />
                {error && <p className="text-sm text-sub">{errorMessage}</p>}
              </label>
              <textarea
                defaultValue={introduction}
                placeholder="소개 글"
                type="text"
                id="introduction"
                className="resize-none h-20 bg-sub rounded-[10px] outline-none p-2"
              ></textarea>
            </div>
            <button
              type="submit"
              className="absolute bottom-5 border-sub border-2 button"
            >
              수정 완료
            </button>
          </form>
          <button
            onClick={() => setModal(false)}
            className="absolute top-3 right-5"
          >
            ✖
          </button>
        </div>
      </div>
      {isLoading ? <Loading /> : null}
    </>
  );
};

export default EditProfileModal;
