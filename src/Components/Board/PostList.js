import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getPostListFetch } from "../../api/postFetch";
import Pagenation from "./Pagenation";
import Loading from "../Loading";
import styled from "styled-components";
import Card from "../Card";

const PostList = () => {
  const { search, pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const navigation = useNavigate();
  const [category, setCategory] = useState();
  const [post, setPost] = useState([
    {
      nickName: "jchwoon",
      userImage:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
      postId: 1,
      title: "CORS 문제문제문제문제문제문제문제문제문제문제문제문제문제문제",
      createdAt: "2023-02-08T18:07:17.788471",
      thumbNail: "",
    },
  ]);
  const [totalPage, setTotalPage] = useState(10);
  const [isLodding, setIsLoading] = useState(false);
  const page = searchParams.get("currentPage");

  // useEffect(() => {
  //   const getPostListData = async () => {
  //     setIsLoading(true);
  //     const { data } = await getPostListFetch(search);
  //     console.log(data);
  //     setTotalPage(Math.ceil(data.totalElements / 20));
  //     setPost(data.content);
  //     setIsLoading(false);
  //   };
  //   getPostListData();
  // }, [search]);
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
          <Pagenation postPage={page} totalPage={totalPage} path={pathname} />
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
