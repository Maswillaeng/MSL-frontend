import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getPostListFetch } from "../../api/postFetch";
import Pagenation from "./Pagenation";
import Loading from "../Loading";
import styled from "styled-components";
import { changeDateFormat, compactFormat } from "../../utility/chage-format";
import Card from "../Card";

const PostList = () => {
  const { search, pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const navigation = useNavigate();
  const [post, setPost] = useState([
    {
      nickName: "jchwoon",
      userImage:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
      postId: 1,
      title: "CORS 문제문제문제문제문제문제문제문제문제문제문제문제문제문제",
      createdAt: "2023-02-08T18:07:17.788471",
      thumbNail:
        "https://png.pngtree.com/back_origin_pic/00/02/63/bbe2717fa374224b3af4e2dba3908d91.jpg",
    },
    {
      nickName: "jchwoon",
      userImage:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
      postId: 2,
      title: "CORS 문제",
      createdAt: "2023-02-08T18:07:17.788471",
      thumbNail: "",
    },
    {
      nickName: "jchwoon",
      userImage:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
      postId: 3,
      title: "CORS 문제",
      createdAt: "2023-02-08T18:07:17.788471",
      thumbNail:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
    },
    {
      nickName: "jchwoon",
      userImage:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
      postId: 4,
      title: "CORS 문제",
      createdAt: "2023-02-08T18:07:17.788471",
      thumbNail:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
    },
    {
      nickName: "jchwoon",
      userImage:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
      postId: 5,
      title: "CORS 문제",
      createdAt: "2023-02-08T18:07:17.788471",
      thumbNail:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
    },
    {
      nickName: "jchwoon",
      userImage:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
      postId: 6,
      title: "CORS 문제",
      createdAt: "2023-02-08T18:07:17.788471",
      thumbNail:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
    },
    {
      nickName: "jchwoon",
      userImage:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
      postId: 7,
      title: "CORS 문제",
      createdAt: "2023-02-08T18:07:17.788471",
      thumbNail:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
    },
    {
      nickName: "jchwoon",
      userImage:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
      postId: 8,
      title: "CORS 문제",
      createdAt: "2023-02-08T18:07:17.788471",
      thumbNail:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
    },
    {
      nickName: "jchwoon",
      userImage:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
      postId: 9,
      title: "CORS 문제",
      createdAt: "2023-02-08T18:07:17.788471",
      thumbNail:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
    },
    {
      nickName: "jchwoon",
      userImage:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
      postId: 10,
      title: "CORS 문제",
      createdAt: "2023-02-08T18:07:17.788471",
      thumbNail:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
    },
    {
      nickName: "jchwoon",
      userImage:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
      postId: 11,
      title: "CORS 문제",
      createdAt: "2023-02-08T18:07:17.788471",
      thumbNail:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
    },
    {
      nickName: "jchwoon",
      userImage:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
      postId: 12,
      title: "CORS 문제",
      createdAt: "2023-02-08T18:07:17.788471",
      thumbNail:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
    },
    {
      nickName: "jchwoon",
      userImage:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg",
      postId: 13,
      title: "CORS 문제",
      createdAt: "2023-02-08T18:07:17.788471",
      thumbNail:
        "https://tse4.mm.bing.net/th?id=OIP.9lqSxhjwBIBBBFI9tvKVSAHaFj&pid=Api&P=0",
    },
  ]);
  const [totalPage, setTotalPage] = useState(10);
  const [isLodding, setIsLoading] = useState(false);
  const page = searchParams.get("currentPage");
  const formatViewNumber = compactFormat({ notation: "compact" }, 10000000);
  const formatLikeNumber = compactFormat({ notation: "compact" }, 213516153);

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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

export default PostList;
