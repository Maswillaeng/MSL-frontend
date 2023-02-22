import Header from "../Components/Header";

const Admin = () => {
  const inputImage = (e) => {
    console.dir(e.target);
  };
  return (
    <div>
      <Header />
      <input type="file" onChange={inputImage} />
    </div>
  );
};

export default Admin;
