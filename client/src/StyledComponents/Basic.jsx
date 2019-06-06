import styled from "styled-components";

export const InputBox = styled.input`
  border: solid;
  outline: none;
  width: 30vw;
  border-radius: 6px;
  background: whitesmoke;

  &::placeholder {
    color: black;
    text-align: center;
  }
`;

export const StyledButton = styled.button`
  background: black;
  border-color: black;
  color: white;
  font-size: 2.5vh;
  border-radius: 4px;
  transition: 0.3s;

  &:hover {
    background: white;
    border-color: white;
    color: black;
  }
`;

export const StyledTA = styled.textarea`
  width: 50%;
  height: 50%;
  border: solid;
  outline: none;

  &::placeholder {
    color: black;
    text-align: center;
  }
`;
