import Loading from "../Loading";
import styled from "styled-components";
import Card from "../Card";

const PostList = ({ post, isLoading }) => {
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

export default PostList;
