import { Link, useLocation } from "react-router-dom";
import { changeDateFormat, formatNumber } from "../utility/chage-format";
import LazyImage from "./LazyImage";
import basicProfile from "../assets/basic_profile.jpg";

const Card = ({ ele }) => {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col rounded-[10px] bg-main relative h-[280px] duration-500 text-sub hover:-translate-y-4 hover:duration-500 hover:ease-in-out">
      <div className="w-full h-[150px]">
        <Link to={`/post/detail/${ele.postId}`}>
          <LazyImage
            alt={"게시물 썸네일"}
            className="object-cover object-center w-full h-[150px] rounded-t-[10px]"
            src={ele.thumbNail || basicProfile}
          />
        </Link>
      </div>
      <div className="p-3">
        <Link
          className="text-xl font-bold w-full block whitespace-nowrap overflow-hidden text-ellipsis"
          to={`/post/detail/${ele.postId}`}
        >
          {ele.title}
        </Link>
        <div className="flex text-sm gap-2">
          <span>
            {changeDateFormat(ele.createdAt, {
              year: "2-digit",
              month: "long",
              day: "2-digit",
            })}
          </span>
          <span>|</span>
          <span>
            조회수
            {formatNumber({ notation: "compact" }, ele?.hits)}
          </span>
          <span>|</span>
          <span>
            댓글{formatNumber({ notation: "compact" }, ele.commentCnt)}
          </span>
        </div>
      </div>
      <div className="flex justify-between p-3 border-t-[1px] border-sub">
        {pathname.includes("users") ? null : (
          <div>
            <Link to={`/users/${ele.userId}`} className="flex">
              <LazyImage
                alt={"유저 이미지"}
                className="object-cover object-center w-[30px] h-[30px] rounded-full mr-3"
                src={ele.userImage || basicProfile}
              />
              <span className="text-sm mt-2">{ele.nickName}</span>
            </Link>
          </div>
        )}
        <div className="flex ">
          <span>💕</span>
          <span>{formatNumber({ notation: "compact" }, ele?.likeCnt)}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
