import Header from "../Components/Header";
import ListOfTableSort from "../Components/Board/ListOfTableSort";
import { useContext, useEffect } from "react";
import { useState } from "react";
import EditProfileModal from "../Components/MyPage/EditProfileModal";
import UserContext from "../context/user-context";
import UserIntroduction from "../Components/MyPage/UserIntroduction";
import Category from "../Components/UI/Category";
import MyPostList from "../Components/MyPage/MyPostList";
import Loading from "../Components/Loading";
import { getUserInfoFetch, userPostListFetch } from "../api/userFetch";
import { redirect, useNavigate } from "react-router-dom";

const MyPage = () => {
  const { userInfo, getUserInfo } = useContext(UserContext);
  const { introduction, nickName, userImage } = userInfo;
  const category = ["나의 글", "좋아요 글"];
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [postList, setPostList] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    const userInfoData = async () => {
      setIsLoading(true);
      const data = await getUserInfoFetch();
      if (!data) {
        return navigation(-1);
      }
      getUserInfo(data);
      setIsLoading(false);
    };
    userInfoData();
  }, []);

  useEffect(() => {
    const userPostListData = async () => {
      setIsLoading(true);
      const data = await userPostListFetch();
      if (!data) {
        return navigation(-1);
      }
      setPostList(data);
      setIsLoading(false);
    };
    userPostListData();
  }, []);

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="relative mt-20 mx-[200px]">
          <UserIntroduction
            nickName={nickName}
            introduction={introduction}
            userImage={userImage}
            setModal={setModal}
          />
          <Category categoryList={category} />
          <ListOfTableSort />
          <div className="mb-7">
            <ul className="flex flex-col gap-3">
              {postList?.map(({ post_id, title, nickName }) => (
                <MyPostList
                  listPostId={post_id}
                  listPostTitle={title}
                  listPostNickName={nickName}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
      {modal ? (
        <EditProfileModal
          userImage={userImage}
          introduction={introduction}
          nickName={nickName}
          setModal={setModal}
          modal={modal}
        />
      ) : null}
    </>
  );
};

export default MyPage;
