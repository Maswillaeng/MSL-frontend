import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";

const TagPage = () => {
  const { tagId } = useParams();

  useEffect(() => {
    const ds = async () => {
      const response = await fetch(
        "http://localhost:8080/api/search/tag?name=dsg&page=1"
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    };
    ds();
  }, []);

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
