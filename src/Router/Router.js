import { createBrowserRouter } from "react-router-dom";
import Board from "../pages/Board";
import BoardCreate from "../pages/BoardCreate";
import BoardDetail from "../pages/BoardDetail";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ModifyBoard from "../pages/ModifyBoard";
import MyPage from "../pages/MyPage";
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
        path: "sign",
        element: <Signup />,
      },
      { path: "login", element: <Login /> },
      {
        path: "post/create",
        element: <BoardCreate />,
      },
      { path: "post/manage/:postId", element: <ModifyBoard /> },
      {
        path: "post/:postPage",
        element: <Board />,
      },
      {
        path: "post/detail/:postId",
        element: <BoardDetail />,
      },
      {
        path: "users/:userId",
        element: <MyPage />,
      },
    ],
  },
]);

export default router;
