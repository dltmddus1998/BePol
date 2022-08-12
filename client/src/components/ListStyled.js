import styled from "styled-components";

export const ListCardSection = styled.section`
  display: flex;
  margin: 1rem;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  width: 100%;
  height: 100%;
  cursor: pointer;
  border: none;
  border-radius: 15px;
  background-color: #f5f5f5;
  box-shadow: 0px 10px 10px -7px rgba(0, 0, 0, 0.5);
`;

export const CardDay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  width: 48px;
  height: 20px;
  margin: 1rem;
  padding: 0.5rem;
  font-weight: 900;
  font-size: ${(props) => (props.imminent === "dead" ? "0.8rem" : "1rem")};
  border-radius: 10px;
  background-color: ${(props) =>
    props.imminent === "low"
      ? "#C4BCEE"
      : props.imminent === "dead"
      ? "#D3CFCF"
      : "#FCB4B4"};
  @import url("https://fonts.googleapis.com/css2?family=Krona+One&display=swap");
  font-family: "Krona One", sans-serif;
`;

export const CardTitle = styled.div`
  padding: 0 2rem;
  overflow: hidden;
  word-break: keep-all;
  height: 10rem;
  & > h3 {
    height: 100%;
    font-size: 1.3rem;
    margin: 0;
  }
`;

export const CardDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  cursor: default;
  margin-top: 2rem;
  width: 95%;
  height: 10%;
`;

export const CardButton = styled.div`
  display: flex;
  align-items: center;
  & > p {
    padding-right: 0.2rem;
  }
`;

export const CardIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  & > img {
    width: 1rem;
    height: 1rem;
  }
`;
