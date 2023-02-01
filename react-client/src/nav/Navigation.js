import { createBrowserRouter } from "react-router-dom";
import AppSample from "../AppSample";
import MainPage from "../comp/mainpage/MainPage";
import MyPageMain from "../comp/mypage/MyPageMain";
import Join from "../comp/login/Join";
import Login from "../comp/login/Login";
import LoginModal from "../comp/login/Login";
import CommMain from "../comp/community/CommMain";
import Board, { loader as BoardLoader } from "../comp/community/Board";
import PostDetail, {
  loader as DetailLoader,
} from "../comp/community/PostDetail";
import PostWrite from "../comp/community/PostWrite";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppSample />,
    children: [
      { path: "", element: <MainPage /> },
      { path: "/user", element: <Join /> },
      { path: "/user/login", element: <Login /> },
      { path: "/mypage", element: <MyPageMain /> },
      { path: "/login", element: <LoginModal /> },
      { path: "/community", element: <CommMain /> },
      {
        path: "/community/:board",
        loader: BoardLoader,
        element: <Board />,
      },
      {
        path: "/community/:board/:post",
        loader: DetailLoader,
        element: <PostDetail />,
      },
      { path: "/community/write/:post?", element: <PostWrite /> },
    ],
  },
]);

export default router;
