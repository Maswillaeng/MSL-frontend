import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPostListFetch } from "../../api/postFetch";
import Loading from "../Loading";
import styled from "styled-components";
import Card from "../Card";

const PostList = () => {
  const [searchParams] = useSearchParams();
  const [post, setPost] = useState([]);
  const [isLodding, setIsLoading] = useState(false);
  const currentCategory = searchParams.get("category");

  console.log(currentCategory);

  useEffect(() => {
    const getPostListData = async () => {
      setIsLoading(true);
      const { data } = await getPostListFetch(currentCategory);
      setPost(data.content);
      setIsLoading(false);
    };
    getPostListData();
  }, [currentCategory]);
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
