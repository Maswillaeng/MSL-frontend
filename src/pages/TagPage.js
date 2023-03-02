import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";

const TagPage = () => {
  const { tagId } = useParams();

  //   useEffect(() => {

  //   }, []);

  //   const getTagPostData = async () => {
  //     const data =
  //   }
  return (
    <>
      <Header />
      <div>
        <h1 className="text-5xl font-bold text-main text-center">#{tagId}</h1>
      </div>
    </>
  );
};

export default TagPage;
