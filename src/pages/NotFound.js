import { useRouteError } from "react-router-dom";

const NotFound = () => {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>404 NotFound</div>;
};

export default NotFound;
