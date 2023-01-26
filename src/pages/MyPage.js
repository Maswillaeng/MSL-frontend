import Header from "../Components/Header";
import ListOfTableSort from "../Components/Board/ListOfTableSort";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const MyPage = () => {
  const category = ["나의 글", "좋아요 글"];
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const { email, introduction, nickName, profileImage, postList } = userInfo;
  useEffect(() => {
    const userInfoData = async () => {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3001/user${userId}`);
      const data = await response.json();
      console.log("h");
      setUserInfo(data);
      setIsLoading(false);
    };
    userInfoData();
  }, [userId]);
  console.log(email, introduction, nickName, profileImage, postList);
  return (
    <div>
      <Header />
      {isLoading ? (
        <div className="flex justify-center mt-20 text-4xl font-bold">
          Loading....
        </div>
      ) : (
        <div className="relative mt-20 mx-[200px]">
          <div className="absolute right-0">
            <button className="button">프로필 수정</button>
          </div>
          <div className="flex">
            <div className="max-w-[50px] max-h-[50px] min-w-[50px] min-h-[50px] mr-5 profile_img"></div>
            <ul>
              <li>{nickName}</li>
              <li>{`소개 글: ${introduction}`}</li>
            </ul>
          </div>
          <ul className="flex items-center gap-7">
            {category.map((val) => (
              <li id={val} className="cursor-pointer" key={val}>
                <button className="button">{val}</button>
              </li>
            ))}
          </ul>
          <ListOfTableSort />
          <div className="mb-7">
            <ul className="flex flex-col gap-3">
              {postList?.map((ele, index) => (
                <li className="list" id={ele.post_id} key={ele.post_id}>
                  <ul className="grid grid-cols-[50px_100px_minmax(200px,_1fr)_100px_100px]">
                    <li className="text-center">{index + 1}</li>
                    <li className="text-center">레시피</li>
                    <li className="text-center ">
                      <span className="cursor-pointer hover:border-b-2 border-main">
                        {ele.title}
                      </span>
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
        </div>
      )}
    </div>
  );
};

export default MyPage;
