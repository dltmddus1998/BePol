import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContainer = styled.div`
  width: 25rem;
  height: 32rem;
  /* display: flex; */
  background: #fff;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 900;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const XWrap = styled.div`
  display: flex;
  flex-direction: row-reverse;
  & > span {
    padding: 1rem 1.5rem 0 0;
    margin: 0;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

export const ModalText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > p {
    margin: 0;
    font-size: 0.8rem;
  }
`;
export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0.5rem;
  padding: 0.5rem 2rem;
`;

export const InputWrap = styled.div`
  width: 100%;
  padding: 1rem 0;
  border: 2px solid #414144;
  border-radius: 3rem;

  & > form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    & > span {
      padding-top: 0.5rem;
      font-size: 0.8rem;
      font-weight: 700;
      color: red;
    }
  }
`;

export const InputEl = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > span {
    font-size: 1rem;
    font-weight: 700;
    padding: 0.5rem 0;
  }
`;
export const Gender = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-around;
`;

export const GenderButton = styled.label`
  border-radius: 0.7rem;
  height: 1.7rem;
  margin: 0.2rem 0;
`;

export const Ages = styled.select`
  width: 11rem;
  height: 1.9rem;
  margin-bottom: 0.7rem;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  outline: none;
`;

export const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 2rem;
`;
export const LoginButton = styled.button`
  height: 2.5rem;
  width: 8rem;
  flex-shrink: 0;
  justify-content: center;
  /* padding: 0.8rem 2rem; */
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.4;
  color: white;
  background: #414144;
  border-radius: 4px;
  border: none;
  transition: all 0.3s;
  &:hover {
    color: #fff;
    transition: all 0.3s;
    background-color: #adadad;
  }
`;
