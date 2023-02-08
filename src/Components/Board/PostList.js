import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostListFetch } from "../../api/postFetch";
import Pagenation from "./Pagenation";
import Loading from "../Loading";

const PostList = () => {
  const { postPage } = useParams();
  const navigation = useNavigate();
  const [post, setPost] = useState([]);
  const [totalPage, setTotalPage] = useState(10);
  const [isLodding, setIsLoading] = useState(false);

  useEffect(() => {
    const getPostListData = async () => {
      setIsLoading(true);
      const data = await getPostListFetch(postPage);
      setTotalPage(Math.ceil(data.totalCount / 10));
      setPost(data.postList);
      setIsLoading(false);
    };
    getPostListData();
  }, [postPage]);
  return (
    <>
      {isLodding ? (
        <Loading />
      ) : (
        <>
          <div className="mb-7">
            <ul className="flex flex-col gap-3">
              {post.map((ele) => (
                <li className="list" id={ele.post_id} key={ele.post_id}>
                  <ul className="grid grid-cols-[50px_100px_minmax(200px,_1fr)_100px_100px]">
                    <li className="text-center">{ele.post_id}</li>
                    <li className="text-center">레시피</li>
                    <li
                      className="text-center "
                      onClick={() => navigation(`/post/detail/${ele.post_id}`)}
                    >
                      <div className="cursor-pointer hover:border-b-2 border-main truncate">
                        {ele.title}
                      </div>
                    </li>
                    <li className="text-center">{ele.nickName}</li>
                    <li className="text-center">
                      {Math.floor(Date.now() / 1000000000)}
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <Pagenation postPage={postPage} totalPage={totalPage} />
        </>
      )}
    </>
  );
};

export default PostList;
