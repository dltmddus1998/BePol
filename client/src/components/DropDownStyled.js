import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 50px;
  top: 50px;
  //align-items: left;
  justify-content: space-between;
  box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  font-size: 15px;
  padding: 0.5rem;
  width: 200px;
`;

export const NotiTitle = styled.div`
  border-bottom: solid 0.5px;
  border-bottom-color: rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
`;

export const NotiList = styled.ul`
  align-items: center;
  padding: 0.2rem;
  margin: 0.2rem;
`;

export const Notify = styled.div`
  align-items: center;
  margin: 0.2rem;
  padding: 0.5rem;
  font-weight: normal;
  font-size: 0.8rem;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
    box-shadow: 0px 0px 6px -1px rgba(0, 0, 0, 0.2);
    //font-weight: bold;
  }
`;
