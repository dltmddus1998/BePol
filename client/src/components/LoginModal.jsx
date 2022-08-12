import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/loginSlice";
import { getUserInfo } from "../reducers/userInfoSlice";
import { showLoginModal } from "../reducers/modalSlice";
import {
  ModalBackground,
  ModalContainer,
  XWrap,
  ModalText,
  InputBox,
  InputWrap,
  InputEl,
  Gender,
  GenderButton,
  Ages,
  ButtonWrap,
  LoginButton,
} from "./LoginModalStyled";

export default function LoginModal() {
  /*
    * 기능: 로그인 회원정보 추가 입력
    * 작성자: 송혜원
    * 📌 성별, 연령대 정보 입력 ✔︎
    * 📌 signup POST 요청 후 로그인 ✔︎
    * 📌 모달 창 스타일 ✔︎

     */

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [loginInfo, setLoginInfo] = useState({
    gender: "", //String
    age: 0, //Integer
  });

  //출생연도 배열
  let now = new Date();
  let nowYear = now.getFullYear();
  const startYear = 1900;
  let yearsLen = nowYear - startYear + 1;
  const birthYears = Array(yearsLen)
    .fill()
    .map((_, i) => i + startYear);

  //입력값 관리 함수
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  //로그인 관리 함수
  const handleLogin = () => {
    if (loginInfo.gender && loginInfo.age) {
      axios
        .post(`${process.env.REACT_APP_API_URI}/users/signup`, {
          gender: loginInfo.gender,
          age: loginInfo.age,
          subId: userInfo.id,
          username: userInfo.username,
        })
        .then((result) => {
          // let data = {
          //   userInfo: {
          //     id: result.data.data.id,
          //     username: result.data.data.username,
          //   },
          // };
          let data = {
            id: result.data.data.id,
            username: result.data.data.username,
          };
          //응답 받은 유저 정보 상태로 저장
          dispatch(getUserInfo(data));
          dispatch(login(result.headers.authorization));
          dispatch(showLoginModal(false));
        });
    }
  };

  return (
    <>
      <ModalBackground onClick={() => dispatch(showLoginModal(false))} />
      <ModalContainer>
        <XWrap>
          <span onClick={() => dispatch(showLoginModal(false))}>&times;</span>
        </XWrap>
        <ModalText>
          <h1>회원정보입력</h1>
          <p>서비스를 이용하기 위해서는 추가정보 입력이 필요합니다</p>
        </ModalText>
        <InputBox>
          <InputWrap>
            <form onSubmit={(e) => e.preventDefault()}>
              <InputEl>
                <span>성별</span>
                <Gender>
                  <GenderButton>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={handleInputValue("gender")}
                    />
                    여성
                  </GenderButton>
                  <GenderButton>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={handleInputValue("gender")}
                    />
                    남성
                  </GenderButton>
                </Gender>
              </InputEl>
              <InputEl>
                <span>출생연도</span>
                <Ages onChange={handleInputValue("age")}>
                  {birthYears.map((year, idx) => (
                    <option key={idx} value={year}>
                      {year}
                    </option>
                  ))}
                </Ages>
              </InputEl>
            </form>
          </InputWrap>
        </InputBox>
        <ButtonWrap>
          <LoginButton type="submit" onClick={handleLogin}>
            로그인 완료하기
          </LoginButton>
        </ButtonWrap>
      </ModalContainer>
    </>
  );
}
