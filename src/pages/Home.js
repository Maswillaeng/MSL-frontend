import Header from "../Components/Header";
import "../styles/input.css";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center w-scrren h-[300px] bg-main">
        <div className="w-3/5 h-[300px] bg-[url('../../public/img/wine.jpg')] bg-cover bg-center"></div>
      </div>
    </>
  );
};

export default Home;
