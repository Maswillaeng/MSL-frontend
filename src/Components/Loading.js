import Spinner from "../assets/spinner.gif";

const Loading = () => {
  return (
    <div className="bg-inherit flex justify-center items-center z-50">
      <img src={Spinner} alt="로딩중" width="10%" />
    </div>
  );
};

export default Loading;
