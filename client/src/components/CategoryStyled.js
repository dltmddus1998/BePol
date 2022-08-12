import styled from "styled-components";

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: center;
  justify-items: center;
  row-gap: 1rem;
  grid-row-gap: 1rem;
  padding: 1rem 1rem 2rem 1rem;
  background-color: #d9d9d9;
  margin: 0;
`;

export const CategoryBlock = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */
  /* align-items: center; */
  /* width: 100%; */
  height: 8rem;
  cursor: pointer;
`;
export const CategoryIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 70px;
  margin: 1rem;
  border-radius: 20rem;
  background-color: ${(props) => {
    if (props.targetId === props.id) {
      return props.backgroundColor;
    } else {
      return props.backgroundColor;
    }
  }};
  & > img {
    width: 3rem;
    height: 3rem;
    /* width: 50px;
    height: 50px; */
  }
`;
export const CategoryTxt = styled.div`
  margin: 0.5rem 0.5rem;
  word-break: keep-all;
  width: 5rem;
  color: #414144;
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
`;
