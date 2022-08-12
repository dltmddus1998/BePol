import styled from "styled-components";

export const Body = styled.div`
  width: 50%;
  min-width: 880px;
  margin: auto;
  margin-top: 30px;
`;

export const Title = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 30px;
  img {
    margin-left: 10px;
    width: 30px;
    height: 30px;
  }
`;

export const DropMenuContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-bottom: ${(props) => props.marginBottom};
`;

export const DropMenu = styled.div`
  position: relative;
`;

export const DropTitle = styled.div`
  border: 1px solid #b1b1b1;
  background: #f1f1f1;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: ${(props) => props.borderRadius};
  border-bottom-right-radius: ${(props) => props.borderRadius};
  display: flex;
  width: 200px;
  height: 25px;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px 0 10px;
  margin: 0 10px 0px 30px;
  cursor: pointer;
`;

export const DropOptions = styled.div`
  position: absolute;
  left: 0;
  z-index: 1;
  height: 300px;
  margin-left: 30px;
  label {
    border: 1px solid #b1b1b1;
    background: #f1f1f1;
    display: inline-block;
    width: 225px;
    height: 25px;
    padding-top: 5px;
    &:hover {
      background: #414144;
      color: #ffffff;
    }
  }
  input {
    margin: 0 10px 0 5px;
  }
`;

export const Category = styled.div`
  display: flex;
  border-bottom: 1px solid #a09e9e;
  span {
    margin: 10px 0 10px 15px;
    background: #414144;
    color: #ffffff;
    border-radius: 15px;
    padding: 5px 10px 5px 10px;
    &:first-child {
      margin-left: 30px;
    }
  }
`;

export const InputField = styled.div`
  margin-top: 30px;
  border-bottom: 1px solid #a09e9e;
  div {
    font-size: 20px;
    margin-left: 40px;
  }
  input {
    width: 90%;
    font-size: 15px;
    padding: 5px 0 5px 0;
    margin-left: 40px;
    border: none;
    outline: none;
  }
`;

export const Textarea = styled.textarea`
  width: 90%;
  height: ${(props) => props.height};
  font-size: 15px;
  padding: 5px 0 5px 0;
  margin: 0 40px 0 40px;
  resize: none;
  overflow: auto;
  border: none;
  outline: none;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #414144;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: #d9d9d9;
  }
`;

export const Length = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 5px 5% 10px 0;
  div {
    font-size: 15px;
    color: ${(props) => props.color};
    &:last-child {
      margin-left: 20px;
    }
  }
`;

export const AttachedField = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  margin-left: 20px;
  div & {
    font-size: 20px;
    margin-left: 40px;
    flex: 0.2 0 0;
  }
`;

export const AttachedInput = styled.label`
  flex: 0.8 0 0;
  width: 100%;
  height: 35px;
  margin-left: 100px;
  div {
    background: #f8f8f8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    span {
      font-size: 13px;
      &:first-child {
        margin-left: 10px;
      }
      &:last-child {
        background: #d9d9d9;
        border-radius: 5px;
        padding: 3px 10px 3px 10px;
        margin-right: 10px;
      }
    }
  }
  input {
    display: none;
  }
`;

export const AttachedFile = styled.div`
  min-height: 60px;
  margin-top: 10px;
  margin-left: 210px;
  div {
    width: 600px;
    word-break: break-all;
    &:first-child {
      margin-bottom: 10px;
    }
    svg {
      margin-left: 5px;
    }
  }
`;

export const ButtonField = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  div {
    background: #f5f5f5;
    cursor: pointer;
    border: none;
    font-size: 20px;
    text-align: center;
    width: 100px;
    height: 30px;
    border-radius: 10px;
    padding-top: 5px;
    &:first-child {
      margin-right: 20px;
    }
    &:hover {
      background: #414144;
      color: #ffffff;
    }
  }
`;
