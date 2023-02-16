import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getPostListFetch } from "../../api/postFetch";
import Loading from "../Loading";
import styled from "styled-components";
import Card from "../Card";
import basicProfile from "../../assets/basic_profile.jpg";

const PostList = () => {
  const [searchParams] = useSearchParams();
  const navigation = useNavigate();
  const [post, setPost] = useState([
    {
      nickName: "jchwoon",
      userImage: basicProfile,
      postId: 1,
      title: "CORS 문제문제문제문제문제문제문제문제문제문제문제문제문제문제",
      createdAt: "2023-02-08T18:07:17.788471",
      thumbNail: "",
    },
  ]);
  const [isLodding, setIsLoading] = useState(false);
  const currentCategory = searchParams.get("category");

  // useEffect(() => {
  //   const getPostListData = async () => {
  //     setIsLoading(true);
  //     const { data } = await getPostListFetch(currentCategory);
  //     setPost(data.content);
  //     setIsLoading(false);
  //   };
  //   getPostListData();
  // }, [currentCategory]);
  return (
    <>
      {isLodding ? (
        <Loading />
      ) : (
        <>
          <div className="mb-7">
            <GridCard>
              {post?.map((ele) => (
                <Card key={ele.postId} ele={ele} />
              ))}
            </GridCard>
          </div>
        </>
      )}
    </>
  );
};

const GridCard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
  gap: 30px;
`;

export default PostList;
