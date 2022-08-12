import axios from "axios";
import { persistor } from "../store/store";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/loginSlice";
import DropDown from "../components/DropDown";
import {
  Container,
  Logo,
  Buttons,
  Button,
  Icon,
  NotiBox,
} from "./HeaderStyled";
import { checkNotification } from "../reducers/notificationSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const seen = useSelector((state) => state.notification.seen);
  const isLogin = useSelector((state) => state.login.isLogin);
  const accessToken = useSelector((state) => state.login.accessToken);
  const user = useSelector((state) => state.user.userInfo);
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT}&response_type=code`;
  const handleClick = () => {
    setIsOpen(!isOpen);
    dispatch(checkNotification(true));
  };

  const purge = async () => {
    await persistor.purge();
  };

  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_API_URI}/users/logout`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then(() => {
        dispatch(logout());
        setTimeout(() => purge(), 100);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <Container>
      <Link to="/">
        <Logo>
          <img src="/images/logo.png" alt="Bepol logo" />
        </Logo>
      </Link>
      {isLogin ? (
        <Buttons>
          <span>{user.username}님</span>
          <img
            src="/images/writeHeaderIcon.png"
            alt="writing Icon"
            onClick={() => navigate("/write")}
          />
          <NotiBox ref={ref}>
            <Icon
              src={
                seen
                  ? "/images/notificationEmptyIcon.png"
                  : "/images/notificationIcon.png"
              }
              alt="notification Icon"
              width="20px"
              onClick={handleClick}
            />

            {isOpen ? <DropDown /> : <></>}
          </NotiBox>

          <Button onClick={handleLogout}>로그아웃</Button>
        </Buttons>
      ) : (
        <Buttons>
          <Button onClick={() => (window.location.href = `${KAKAO_AUTH_URL}`)}>
            로그인
          </Button>
        </Buttons>
      )}
    </Container>
  );
}
