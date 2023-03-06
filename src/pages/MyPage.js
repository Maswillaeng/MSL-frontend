import Header from "../Components/Header";
import { useContext, useEffect, useState, useRef } from "react";
import EditProfileModal from "../Components/MyPage/EditProfileModal";
import UserContext from "../context/user-context";
import UserIntroduction from "../Components/MyPage/UserIntroduction";
import Category from "../Components/UI/Category";
import Loading from "../Components/Loading";
import { createPortal } from "react-dom";
import { getSomeoneUserInfoFetch, userPostListFetch } from "../api/userFetch";
import { useParams } from "react-router-dom";
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
  const [someoneInfo, setSomeoneInfo] = useState({});
  const { category, changeCurrentCategory } = useCategory("myCategory");
  const [isFollow, setIsFollow] = useState(false);

  const [categoryDataMap, setCategoryDataMap] = useState({});
  const [currentPageMap, setCurrentPageMap] = useState({});
  const [totalElementsMap, setTotalElmentsMap] = useState({});

  const postList = categoryDataMap[category] || [];

  useEffect(() => {
    const someoneInfoData = async () => {
      setIsLoading(true);
      const { data } = await getSomeoneUserInfoFetch(userId);
      setSomeoneInfo(data);
      setIsFollow(data.followState);
      setIsLoading(false);
    };
    someoneInfoData();
  }, [userId]);

  useEffect(() => {
    const firstGetPostListData = async () => {
      await getUserPostList(category, userId);
    };
    firstGetPostListData();
  }, [category, userId]);

  useEffect(() => {
    console.log(totalElementsMap[category], postList.length);
    if (totalElementsMap[category] === postList.length) return;

    let observer;
    if (lastCardRef.current) {
      observer = new IntersectionObserver(
        async ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentPageMap((prevPageMap) => {
              const newPage = (prevPageMap[category] || 20) + 20;
              return { ...prevPageMap, [category]: newPage };
            });
            const page = (currentPageMap[category] || 20) + 20;
            await getPostDataOfPage(page);
          }
        },
        {
          threshold: 0.1,
        }
      );
      observer.observe(lastCardRef.current);
    }
    return () => observer && observer.disconnect();
  });

  const getUserPostList = async (category, userId) => {
    setIsLoading(true);
    if (!categoryDataMap[category]) {
      const { data } = await userPostListFetch(category, userId, 20);
      setCategoryDataMap((prevMap) => {
        return { ...prevMap, [category]: [...data.content] };
      });
      setTotalElmentsMap((prevTotal) => {
        return { ...prevTotal, [category]: data.totalElements };
      });
      setCurrentPageMap((prevPage) => {
        return { ...prevPage, [category]: 20 };
      });
    }
    setIsLoading(false);
  };

  const getPostDataOfPage = async (page) => {
    const { data } = await userPostListFetch(category, userId, page);
    setCategoryDataMap((prevMap) => {
      const newData = [...(prevMap[category] || []), ...data.content];
      return { ...prevMap, [category]: newData };
    });
  };

  return (
    <>
      <Header />
      <div className="relative mt-10 mx-[100px]">
        <UserIntroduction
          nickName={someoneInfo?.nickName}
          introduction={someoneInfo?.introduction}
          userImage={someoneInfo?.userImage}
          setModal={setModal}
          followerCnt={someoneInfo?.followerCnt}
          followingCnt={someoneInfo?.followingCnt}
          followState={isFollow}
          setFollowState={setIsFollow}
          postNumber={someoneInfo?.postCnt}
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
                  <Card lastCardRef={lastCardRef} key={ele.postId} ele={ele} />
                );
              } else {
                return <Card key={ele.postId} ele={ele} />;
              }
            })}
          </Grid>
          {isLoading ? <Loading /> : null}
        </div>
      </div>
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
