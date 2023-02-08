import Spinner from "../assets/spinner.gif";

const Loading = () => {
  return (
    <div className="bg-[rgba(0,0,0,0.2)] absolute w-screen h-screen top-0 left-0 flex justify-center items-center z-50">
      <img src={Spinner} alt="로딩중" width="5%" />
    </div>
  );
};

export default Loading;
