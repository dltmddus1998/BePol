import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Detail from "./pages/Detail.jsx";
import Login from "./pages/Login.jsx";
import Main from "./pages/Main.jsx";
import Write from "./pages/Write.jsx";
import Header from "./components/Header.jsx";
import LoginModal from "./components/LoginModal.jsx";
import SocketContainer from "./components/SocketContainer.jsx";

function App() {
  const isLogin = useSelector((state) => state.login.isLogin);
  const { loginModal, staticModal } = useSelector((state) => state.modal);

  return (
    <BrowserRouter>
      <Header />
      <SocketContainer />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* 카드 클릭했을 때 상세페이지 이동 경로 => useNavigator 사용 */}
        <Route path="/detail/:postId" element={<Detail />} />
        <Route
          path="/write"
          element={isLogin ? <Write /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={isLogin ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
      {loginModal && <LoginModal />}
    </BrowserRouter>
  );
}

export default App;
