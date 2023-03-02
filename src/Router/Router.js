import { createBrowserRouter } from "react-router-dom";
import Board from "../pages/Board";
import BoardCreate from "../pages/BoardCreate";
import BoardDetail from "../pages/BoardDetail";
import Login from "../pages/Login";
import ModifyBoard from "../pages/ModifyBoard";
import MyPage from "../pages/MyPage";
import Signup from "../pages/Signup";
import Root from "../Root";
import NotFound from "../pages/NotFound";
import AuthTest from "../Components/AuthTest";
import Admin from "../pages/Admin";
import TagPage from "../pages/TagPage";
import Search from "../pages/Search";

const onlyLogin = "ONLY_LOGIN";
const onlyLogout = "ONLY_LOGOUT";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: AuthTest(Board, null),
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
        path: "post/detail/:postId",
        element: AuthTest(BoardDetail, null),
      },
      {
        path: "users/:userId",
        element: AuthTest(MyPage, null),
      },
      { path: "tags/:tagId", element: AuthTest(TagPage, null) },
      { path: "search", element: AuthTest(Search, null) },
      { path: "admin", element: <Admin /> },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
