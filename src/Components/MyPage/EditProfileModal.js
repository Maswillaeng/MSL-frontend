import { useContext, useEffect, useState } from "react";
import { editProfileFetch } from "../../api/userFetch";
import UserContext from "../../context/user-context";
import { nickNameRule } from "../../utility/input-rules";
import Loading from "../Loading";

const EditProfileModal = ({ userImage, introduction, nickName, setModal }) => {
  const { userInfo } = useContext(UserContext);
  const [editUserImage, setEditUserImage] = useState(userImage);
  const [editNickName, setEditNickName] = useState(nickName);
  const [editIntroduction, setEditIntroduction] = useState(introduction);
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  //유저가 입력을 하고 있을때는 settimed을 계속 돌린다

  const changeProfileImg = (e) => {
    let reader = new FileReader();

    reader.onload = (e) => {
      setEditUserImage(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const changeEditNickName = (e) => {
    setEditNickName(e.target.value);
  };

  const changeEditIntroduction = (e) => {
    setEditIntroduction(e.target.value);
  };

  const submitEditProfile = async (e) => {
    e.preventDefault();
    if (!nickNameRule.test(editNickName)) return;
    setIsLoading(true);
    try {
      const response = await editProfileFetch(
        userInfo,
        editUserImage,
        editNickName,
        editIntroduction
      );
      if (response.ok) {
        setModal(false);
        window.location.replace("/users/1");
      } else {
        throw new Error("중복된 닉네임 입니다.");
      }
    } catch (error) {
      alert(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const testUserNickName = setTimeout(() => {
      if (nickNameRule.test(editNickName)) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }, 1000);
    return () => clearTimeout(testUserNickName);
  }, [editNickName]);

  return (
    <>
      <div
        onClick={(e) => {
          if (!e.target.closest(".modal")) {
            setModal(false);
          }
        }}
        className="flex justify-center items-center  bg-[rgba(0,0,0,0.3)] absolute top-0 w-full h-full"
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
                src={`${
                  editUserImage ??
                  "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg"
                }`}
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
                  value={editNickName}
                  onChange={changeEditNickName}
                />
                <p className="text-sm text-sub">3자 이상 8자 이하</p>
              </label>

              <textarea
                placeholder="소개 글"
                type="text"
                id="introduction"
                className="resize-none h-20 bg-sub rounded-[10px] outline-none p-2"
                value={editIntroduction}
                onChange={changeEditIntroduction}
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
