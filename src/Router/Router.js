import { createBrowserRouter } from "react-router-dom";
import Board from "../pages/Board";
import BoardCreate from "../pages/BoardCreate";
import BoardDetail from "../pages/BoardDetail";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Root from "../Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "join",
        element: <Signup />,
      },
      { path: "login", element: <Login /> },
      {
        path: "create-post",
        element: <BoardCreate />,
      },
      {
        path: "posts",
        element: <Board />,
      },
      {
        path: "posts/:postId",
        element: <BoardDetail />,
      },
    ],
  },
]);

export default router;
