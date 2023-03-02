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
import { useReducer } from "react";

const categoryList = [
  { id: "", category: "전체" },
  { id: "RECIPE", category: "레시피" },
  { id: "BAR_SNACK", category: "안주 추천" },
  { id: "FREE", category: "자유" },
];

const postListReducer = (state, { type, val }) => {
  console.log(val);
  const copyState = JSON.parse(JSON.stringify(state));
  switch (type) {
    case "POST_LIST_UPDATE":
      const offset = copyState[`${val.category}PostList`].offset;
      const prevList = [...copyState[`${val.category}PostList`].postList];
      if (prevList?.length === offset + val.postList?.length - 20)
        return copyState;
      copyState[`${val.category}PostList`].postCnt = val?.totalElements;
      copyState[`${val.category}PostList`].postList = [
        ...prevList,
        ...val.postList,
      ];
      return copyState;
    case "UPDATE_OFFSET":
      copyState[`${val.category}PostList`].offset = val.offset;
      return copyState;
    default:
      return null;
  }
};

const MyPage = () => {
  const { userInfo } = useContext(UserContext);
  const { introduction, nickName, userImage } = userInfo;
  const lastCardRef = useRef(null);
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [postListObj, dispatchPostList] = useReducer(postListReducer, {
    PostList: {
      offset: 20,
      postCnt: 0,
      postList: [],
    },
    RECIPEPostList: {
      offset: 20,
      postCnt: 0,
      postList: [],
    },
    BAR_SNACKPostList: {
      offset: 20,
      postCnt: 0,
      postList: [],
    },
    FREEPostList: {
      offset: 20,
      postCnt: 0,
      postList: [],
    },
  });
  const [totalPostNumber, setTotalPostNumber] = useState(1);
  const [someoneInfo, setSomeoneInfo] = useState({});
  const { category, changeCurrentCategory } = useCategory("myCategory");
  const postList = postListObj[`${category}PostList`].postList;
  const offset = postListObj[`${category}PostList`].offset;

  useEffect(() => {
    const someoneInfoData = async () => {
      setIsLoading(true);
      const data = await getSomeoneUserInfoFetch(userId);
      console.log(data);
      setSomeoneInfo(data);
      setIsLoading(false);
    };
    someoneInfoData();
  }, [userId]);

  useEffect(() => {
    const firstGetPostListData = async () => {
      await getUserPostList(category, userId, offset);
    };
    firstGetPostListData();
  }, [category, userId, offset]);

  useEffect(() => {
    if (totalPostNumber === postList.length) return;

    let observer;
    if (lastCardRef.current) {
      observer = new IntersectionObserver(
        async ([entry]) => {
          if (entry.isIntersecting) {
            dispatchPostList({
              type: "UPDATE_OFFSET",
              val: { offset: offset + 20, category },
            });
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
  //카테고리가 바뀌면 오프셋도 초기화

  const getUserPostList = async (category, userId, offset) => {
    setIsLoading(true);
    const { data } = await userPostListFetch(category, userId, offset);
    setTotalPostNumber(data.totalElements);
    dispatchPostList({
      type: "POST_LIST_UPDATE",
      val: {
        postList: data.content,
        category,
        totalElements: data.totalElements,
      },
    });
    setIsLoading(false);
  };
  console.log(someoneInfo);
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
          followingCnt={someoneInfo?.followerCnt}
          followState={someoneInfo?.followState}
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
