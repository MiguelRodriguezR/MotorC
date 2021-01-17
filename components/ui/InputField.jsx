import styled from "@emotion/styled";

const FormField = styled.div`
  width: 100%;
  background-color: #19193C;
  padding: 7px;
  margin-bottom: 15px;
  border: none;
  color: white;
  border-radius: 5px;
  display: flex;
  transition: background-color .2s ease-out;
  i {
      padding: 5px;
    font-size: 1em;
  }
  input {
    padding: 5px;
    width: 100%;
    background: transparent;
    color: white;
    margin-left: 5px;
    border: none;
    &::placeholder {
      color: white;
    }
    &:focus{
        border: none;
        outline: none;
      color: #0F0F1E;

    }
  }
  &:hover {
    background-color: white;
    color: #0F0F1E;
  }
  &:hover input{
    color: #0F0F1E;
  }
  &:hover input::placeholder{
    color: #0F0F1E;
  }
  &:focus-within {
      background-color:white;
      color: #0F0F1E;
  }
`;

export default FormField;
