import styled from "styled-components";

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background: #ffffff;
  svg {
    position: absolute;
    top: 1%;
    right: 1%;
    cursor: pointer;
  }
`;

export const Title = styled.div`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  margin: 30px 0 30px 0;
`;

export const ChartField = styled.div`
  display: flex;
`;

export const Chart = styled.div`
  width: 600px;
`;

export const AgeField = styled.div`
  font-size: 20px;
  width: 100px;
  text-align: center;
  font-weight: bold;
  margin-top: 65px;
  div {
    margin-bottom: 20px;
  }
`;

export const NoData = styled.div`
  min-height: 480px;
  min-width: 1300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    &:first-child {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    &:last-child {
      font-size: 20px;
    }
  }
`;
