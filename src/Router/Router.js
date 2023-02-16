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
import NotFound from "../pages/NotFound";
import AuthTest from "../Components/AuthTest";
import UpdateToken from "../pages/UpdateToken";

const onlyLogin = "ONLY_LOGIN";
const onlyLogout = "ONLY_LOGOUT";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: AuthTest(Home, null),
      },
      {
        path: "sign",
        element: AuthTest(Signup, onlyLogout),
      },
      { path: "login", element: AuthTest(Login, onlyLogout) },
      {
        path: "post/create",
        element: AuthTest(BoardCreate, onlyLogin),
      },
      {
        path: "post/manage/:postId",
        element: AuthTest(ModifyBoard, onlyLogin),
      },
      {
        path: "post",
        element: AuthTest(Board, null),
      },
      {
        path: "post/detail/:postId",
        element: AuthTest(BoardDetail, null),
      },
      {
        path: "users/:userId",
        element: AuthTest(MyPage, onlyLogin),
      },
      {
        path: "updateToken",
        element: <UpdateToken />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
