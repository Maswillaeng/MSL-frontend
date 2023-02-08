import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPostListFetch } from "../../api/postFetch";
import Pagenation from "./Pagenation";
import Loading from "../Loading";

const PostList = () => {
  const { search } = useLocation();
  const navigation = useNavigate();
  const [post, setPost] = useState([]);
  const [totalPage, setTotalPage] = useState(10);
  const [isLodding, setIsLoading] = useState(false);

  useEffect(() => {
    const getPostListData = async () => {
      setIsLoading(true);
      const { data } = await getPostListFetch(search);
      console.log(data);
      setTotalPage(Math.ceil(data.totalElements / 20));
      setPost(data.content);
      setIsLoading(false);
    };
    getPostListData();
  }, [search]);
  return (
    <>
      {isLodding ? (
        <Loading />
      ) : (
        <>
          <div className="mb-7">
            <ul className="flex flex-col gap-3">
              {post?.map((ele) => (
                <li className="list" id={ele.postId} key={ele.postId}>
                  <ul className="grid grid-cols-[50px_100px_minmax(200px,_1fr)_100px_100px]">
                    <li className="text-center">{ele.postId}</li>
                    <li className="text-center">레시피</li>
                    <li
                      className="text-center "
                      onClick={() => navigation(`/post/detail/${ele.postId}`)}
                    >
                      <div className="cursor-pointer hover:border-b-2 border-main truncate">
                        {ele.title}
                      </div>
                    </li>
                    <li className="text-center">{ele.nickname}</li>
                    <li className="text-center">{ele.createdAt}</li>
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <Pagenation postPage={search} totalPage={totalPage} />
        </>
      )}
    </>
  );
};

export default PostList;
