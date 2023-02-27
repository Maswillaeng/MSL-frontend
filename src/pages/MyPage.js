import Header from "../Components/Header";
import { useContext, useEffect, useState, useRef } from "react";
import EditProfileModal from "../Components/MyPage/EditProfileModal";
import UserContext from "../context/user-context";
import UserIntroduction from "../Components/MyPage/UserIntroduction";
import Category from "../Components/UI/Category";
import Loading from "../Components/Loading";
import basicImage from "../assets/basic_thumbnail.png";
import { createPortal } from "react-dom";
import {
  getSomeoneUserInfoFetch,
  getUserInfoFetch,
  userPostListFetch,
} from "../api/userFetch";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Card from "../Components/Card";
import { GridCard } from "../Components/Board/PostList";
import styled from "styled-components";

const categoryList = [
  { id: "", category: "전체" },
  { id: "RECIPE", category: "레시피" },
  { id: "BAR_SNACK", category: "안주 추천" },
  { id: "FREE", category: "자유" },
];

const MyPage = () => {
  const { userInfo } = useContext(UserContext);
  const { introduction, nickName, userImage } = userInfo;
  const lastCardRef = useRef(null);
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [postList, setPostList] = useState([
    {
      postId: 12,
      title: "칵테일 레시피",
      createdAt: "2023-02-08T18:07:17.788471",
      thumbNail: basicImage,
      hits: 15,
      commentCnt: 20,
      likeCnt: 150,
    },
  ]);
  const [someoneInfo, setSomeoneInfo] = useState({
    nickName: "정채운",
    introduction: "안녕하세요 저는 칵테일을 좋아합니다.",
    userImage: basicImage,
  });
  const { category, changeCurrentCategory } = useCategory("myCategory");

  useEffect(() => {
    const someoneInfoData = async () => {
      setIsLoading(true);
      const data = await getSomeoneUserInfoFetch(userId);
      setSomeoneInfo(data);
      setIsLoading(false);
    };
    someoneInfoData();
  }, [userId]);

  useEffect(() => {
    let observer;
    if (lastCardRef) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            getUserPostList();
          }
        },
        {
          threshold: 1,
        }
      );
      observer.observe(lastCardRef.current);
    }
    return () => observer && observer.disconnect(lastCardRef);
  });

  const getUserPostList = async () => {
    const offset = postList.length + 20;
    setIsLoading(true);
    const { data } = await userPostListFetch(category, userId, offset);
    setPostList((prevList) => {
      return [...prevList, ...data];
    });
    setIsLoading(false);
  };
  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="relative mt-10 mx-[100px]">
          <UserIntroduction
            nickName={someoneInfo.nickName}
            introduction={someoneInfo.introduction}
            userImage={someoneInfo.userImage}
            setModal={setModal}
          />
          <Category
            categoryList={categoryList}
            category={category}
            changeCurrentCategory={changeCurrentCategory}
          />
          <div className="mt-7">
            <Grid>
              {postList?.map((ele, index) => {
                if (postList.length - 1 === index) {
                  return (
                    <Card
                      lastCardRef={lastCardRef}
                      key={ele.postId}
                      ele={ele}
                    />
                  );
                } else {
                  return <Card key={ele.postId} ele={ele} />;
                }
              })}
            </Grid>
          </div>
        </div>
      )}
      {modal
        ? createPortal(
            <EditProfileModal
              userImage={userImage}
              introduction={introduction}
              nickName={nickName}
              setModal={setModal}
              modal={modal}
              userId={userId}
            />,
            document.getElementById("modal")
          )
        : null}
    </>
  );
};

const Grid = styled(GridCard)``;

export default MyPage;
