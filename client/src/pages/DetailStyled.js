import styled from "styled-components";

export const Title = styled.div`
  margin: 0 0 50px 0;
  span {
    &:first-child {
      margin-left: 30px;
    }
    margin-right: 10px;
  }
  div {
    font-size: 35px;
    text-align: center;
    margin-top: 15px;
    font-weight: bold;
  }
`;

export const Info = styled.div`
  margin-bottom: 10px;
  .writer {
    display: flex;
    justify-content: space-between;
    margin: 0 30px 0 30px;
    div {
      padding-bottom: 10px;
      &:first-child {
        font-weight: bold;
      }
      &.removeButton {
        border-radius: 10px;
        padding: 5px 10px 5px 10px;
        background: #cccccc;
        cursor: pointer;
      }
    }
  }
  span {
    margin-left: 30px;
  }
`;

export const ResultField = styled.div`
  .detailResult {
    width: 120px;
    margin: auto;
    text-decoration: underline;
    cursor: pointer;
    font-weight: bold;
  }
  .propsAndCons {
    margin-top: 30px;
    display: flex;
    height: 80px;
  }
`;

export const ProsAndCons = styled.div`
  background: ${(props) => props.background};
  flex: ${(props) => props.flex};
  text-align: ${(props) => props.textAlign};
  position: relative;
  color: #ffffff;
  font-size: 25px;
  font-weight: bold;
  .pros {
    position: absolute;
    top: 35%;
    left: 20px;
    z-index: 1;
  }
  .cons {
    position: absolute;
    top: 30%;
    right: 20px;
    z-index: 1;
  }
`;

export const VoteField = styled.div`
  display: flex;
  justify-content: space-around;
  width: 500px;
  margin: 20px auto 0 auto;
`;

export const Vote = styled.div`
  border: 1px solid #cdcdcd;
  font-size: 35px;
  font-weight: bold;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  cursor: pointer;
  div {
    &:first-child {
      border-right: 1px solid #cdcdcd;
      text-align: center;
      width: 130px;
      padding: 5px 10px 5px 10px;
    }
    &:last-child {
      width: 50px;
    }
  }
  img {
    width: 40px;
    height: 40px;
    padding: 5px;
  }
`;

export const ContentsField = styled.div`
  background: #f9f9f9;
  padding: 30px 0 30px 0;
`;

export const Contents = styled.div`
  border-bottom: 1px solid #a09e9e;
  width: 90%;
  margin: auto;
  margin-bottom: 30px;
  white-space: pre-line;
  word-break: break-all;
  div {
    &:first-child {
      font-size: 20px;
      margin-bottom: 10px;
    }
    &:last-child {
      margin-bottom: 30px;
    }
    &.purport {
      min-height: 60px;
    }
    &.contents {
      min-height: 180px;
    }
  }
`;

export const AttachedField = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
  div {
    font-size: 20px;
  }
`;

export const AttachedFile = styled.div`
  margin-left: 100px;
  div {
    color: #0e5ebc;
    font-size: 15px;
    cursor: pointer;
  }
`;

export const InputField = styled.div`
  border-bottom: 1px solid #a09e9e;
  width: 90%;
  margin: auto;
  display: flex;
  margin-top: 40px;
  padding-bottom: 20px;
  textarea {
    background: #f9f9f9;
    flex: 9 0 0;
    border: none;
    padding: 10px;
    resize: none;
    outline: none;
    height: 60px;
    font-size: 16px;
  }
  div {
    flex: 1 0 0;
    background: #474747;
    color: #ffffff;
    margin-left: 10px;
    text-align: center;
    padding: 5px 0 5px 0;
    border-radius: 10px;
    height: 20px;
    cursor: pointer;
  }
`;

export const SortBy = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 5px;
`;

export const Sort = styled.span`
  cursor: pointer;
  font-weight: ${(props) => props.bold};
`;

export const CommentsField = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 30px;
  .loading {
    margin-top: 20px;
    text-align: center;
  }
`;
