import { useNavigate } from "react-router-dom";

const Pagenation = ({ postPage, totalPage, path }) => {
  const navigation = useNavigate();
  const arrayOfTotalPage = Array.from({ length: totalPage }, (_, k) => k + 1);

  const changePageToFront = () => {
    const currentPage = postPage;
    const nextPage =
      +currentPage + 10 > +totalPage ? totalPage : +currentPage + 10;
    navigation(`${path}?currentPage=${nextPage}`);
  };

  const changePageToPrev = () => {
    const currentPage = postPage;
    const nextPage = +currentPage - 10 < 1 ? 1 : +currentPage - 10;
    navigation(`${path}?currentPage=${nextPage}`);
  };

  const changePageOfTargetNum = (e) => {
    const nextPage = e.target.id;
    navigation(`${path}?currentPage=${nextPage}`);
  };
  return (
    <div>
      <ul className="flex justify-center gap-3">
        <li>
          <button onClick={changePageToPrev} className="text-sm">
            &lt;이전
          </button>
        </li>
        {arrayOfTotalPage.slice(+postPage - 1, +postPage + 9).map((val) =>
          +postPage === +val ? (
            <li
              className="cursor-pointer border-b-2 border-main"
              onClick={changePageOfTargetNum}
              id={val}
              key={val}
            >
              {val}
            </li>
          ) : (
            <li
              className="cursor-pointer"
              onClick={changePageOfTargetNum}
              id={val}
              key={val}
            >
              {val}
            </li>
          )
        )}
        <li>
          <button onClick={changePageToFront} className="text-sm">
            다음&gt;
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagenation;
