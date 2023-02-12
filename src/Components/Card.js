import { Link } from "react-router-dom";
import { changeDateFormat, formatNumber } from "../utility/chage-format";
import LazyImage from "./LazyImage";

const Card = ({ ele }) => {
  return (
    <div className="flex flex-col rounded-[10px] bg-main relative h-[280px] duration-500 text-sub hover:-translate-y-4 hover:duration-500 hover:ease-in-out">
      <div className="w-full h-[150px]">
        <Link to={`/post/detail/${ele.postId}`}>
          <LazyImage
            alt={"게시물 썸네일"}
            className="object-cover object-center w-full h-[150px] rounded-t-[10px]"
            src={ele.thumbNail}
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
            {ele?.view ?? formatNumber({ notation: "compact" }, 10000000)}
          </span>
          <span>|</span>
          <span>
            댓글{ele.comment ?? formatNumber({ notation: "compact" }, 3)}
          </span>
        </div>
      </div>
      <div className="flex justify-between p-3 border-t-[1px] border-sub">
        <div>
          <Link className="flex">
            <LazyImage
              alt={"유저 이미지"}
              className="object-cover object-center w-[30px] h-[30px] rounded-full mr-3"
              src={ele.userImage}
            />
            <span className="text-sm mt-2">{ele.nickName}</span>
          </Link>
        </div>
        <div className="flex ">
          <span>💕</span>
          <span>
            {ele?.like ?? formatNumber({ notation: "compact" }, 213516153)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
