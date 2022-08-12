import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100vw;
  position: relative;
  top: -2px;
  left: -2px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 2px -2px rgba(0, 0, 0, 0.25);
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
  font-family: "Open Sans", sans-serif;
  font-weight: 900;
  font-size: 2rem;
`;

export const Logo = styled.div`
  display: flex;
  padding: 1rem;
  width: 5vw;
  height: 5vh;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  & > span {
    font-size: 1rem;
  }
  & > img {
    cursor: pointer;
    width: 2vw;
    height: 2vh;
  }
`;

export const Button = styled.button`
  height: 2.5rem;
  width: 7rem;
  flex-shrink: 0;
  justify-content: center;
  /* padding: 0.8rem 2rem; */
  margin: 0 1rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.4;
  color: black;
  background: #e6e6e6;
  border-radius: 4px;
  border: none;
  transition: all 0.3s;
  &:hover {
    color: #fff;
    transition: all 0.3s;
    background-color: #adadad;
  }
  /* @media all and (max-width: 1200px) {
        font-size: 1.6rem;
    } */
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const NotiBox = styled.div`
  display: flex;
  margin-left: 1rem;
`;
