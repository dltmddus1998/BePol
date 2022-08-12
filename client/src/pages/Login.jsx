import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginContainer } from "./LoginStyled";
import { getUserInfo } from "../reducers/userInfoSlice";
import { login } from "../reducers/loginSlice";
import { showLoginModal } from "../reducers/modalSlice";

export default function Login() {
  /*
    * 기능: 카카오 소셜 로그인 
    * 작성자: 송혜원
    * 📌 카카오 로그인 동의 ✔︎
    * 📌 카카오 로그인 전 추가 정보 입력창으로 연결 ✔︎
    * 📌 기가입자 로그인 시 accessToken 상태 저장
    * kakao API로 code 요청 후 서버로 로그인 요청

     */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const code = new URL(document.location).searchParams.get("code");

  const handleKakaoLogin = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URI}/users/login`, {
        code: code,
      })
      .then((result) => {
        // 이미 가입한 회원
        if (result.data.isUser === true) {
          //응답 받은 회원 정보를 dispatch를 이용해 userInfo state에 저장
          // let userData = {
          //   userInfo: {
          //     id: result.data.data.id,
          //     username: result.data.data.username,
          //   },
          // };
          let userData = {
            id: result.data.data.id,
            username: result.data.data.username,
          };
          dispatch(getUserInfo(userData));
          //서버에서 보내준 header의 accessToken 값 dispatch로 login 상태 업데이트
          dispatch(login(result.headers.authorization));
        }
        // 아직 가입하지 않은 회원 -> 추가 입력 로그인 모달
        else if (result.data.isUser === false) {
          let userData = {
            id: result.data.data.subId, // 가입 전 유저는 임시로 subId값을 id로 가진다
            username: result.data.data.username,
          };
          dispatch(getUserInfo(userData));
          //메인페이지로 돌아간 후 로그인 모달창 띄우기
          navigate("/", { replace: true });
          setTimeout(() => dispatch(showLoginModal(true)), 500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleKakaoLogin();

  return (
    <>
      <LoginContainer>
        <h1>Bepol</h1>
        <h2>당신만의 법안을 발의해보세요</h2>
      </LoginContainer>
    </>
  );
}
