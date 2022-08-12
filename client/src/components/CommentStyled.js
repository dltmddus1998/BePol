import styled from "styled-components";

export const Container = styled.div`
  margin-bottom: 15px;
`;

export const WriterInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 5px;
`;

export const Writer = styled.div`
  display: flex;
  align-items: center;
  div {
    font-size: 20px;
  }
`;

export const ProsAndCons = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 100%;
  background: ${(props) => props.background};
  border: 1px solid black;
  margin-right: 10px;
`;

export const CommentButton = styled.div`
  display: flex;
  align-items: center;
`;

export const ModifyAndDelete = styled.span`
  font-size: 15px;
  &:first-child {
    cursor: pointer;
    margin-right: 5px;
  }
  &:last-child {
    cursor: pointer;
    margin-left: 5px;
  }
`;

export const CancleAndCheck = styled.span`
  background: ${(props) => props.background};
  color: #ffffff;
  padding: 5px;
  border-radius: 5px;
  cursor: ${(props) => props.cursor};
  &:first-child {
    margin-right: 5px;
  }
  &:last-child {
    margin-left: 5px;
  }
`;

export const Contents = styled.div`
  background: #f9f9f9;
  border-radius: 5px;
  padding: 15px;
  div {
    &:first-child {
      margin-bottom: 5px;
      white-space: pre-wrap;
      word-break: break-all;
    }
    &:last-child {
      display: flex;
      svg {
        margin-right: 5px;
        cursor: pointer;
      }
    }
  }
`;

export const InputModifyComment = styled.textarea`
  resize: none;
  border: none;
  outline-color: #a5a5a5;
  width: 100%;
  font-size: 15px;
  /* height: ${(props) => props.height}; */
  min-height: 80px;
`;
