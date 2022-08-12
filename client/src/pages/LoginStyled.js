import styled from "styled-components";

export const LoginContainer = styled.div`
  background-color: white;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > h1 {
    font-size: 3.75rem;
    font-weight: 900;
    margin: 0;
  }
  & > h2 {
    font-size: 1.8rem;
    font-weight: 500;
    margin-bottom: 1.2rem;
    margin-top: 0.8rem;
  }
`;
