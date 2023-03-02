import Loading from "../Loading";
import styled from "styled-components";
import Card from "../Card";
import useFetch from "../../hooks/useFetch";

const PostList = ({ category }) => {
  const url = `${process.env.REACT_APP_BASE_URL}/api/post${
    category ? `?category=${category}` : ""
  }`;
  const [{ data: post }, isLoading, error] = useFetch("GET", url, {});

  return (
    <>
      {isLoading ? (
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

export const GridCard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
  gap: 30px;
`;

export default PostList;
