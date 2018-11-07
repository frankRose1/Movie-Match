import styled from 'styled-components';

const FormStyles = styled.form`
  margin: 0 auto;
  width: 80%;
  text-align: center;
  box-shadow: ${props => props.theme.bs};
  background: white;
  border: 1px solid #eee;
  padding: 10px;

  @media (min-width: 600px) {
    max-width: 550px;
  }

  div {
    width: 100%;
    padding: 10px;
    margin-bottom: 8px;
    label {
      display: block;
      font-weight: bold;
    }
    input, textarea {
      outline: none;
      border: 1px solid #ccc;
      background-color: #fff;
      font: inherit;
      padding: 10px;
      display: block;
      width: 100%;
    }

    input:focus{
      outline: none;
      background-color: #ccc;
    }
  }
  
  button[type="submit"] {
    cursor: pointer;
    border: 1px solid transparent;
    outline: none;
    color: white;
    background: ${props => props.theme.yellow};
    border-radius: 3px;
    padding: 8px 12px;
    font-size: 1.5rem;
    transition: all 0.4s ease-in-out;
    &:hover{
      background: white;
      color: ${props => props.theme.yellow};
      border: 1px solid ${props => props.theme.yellow};
    }
  }
  button:disabled {
    cursor: not-allowed;
    color: #ccc;
  }
`;

// .invalid input, 
// .invalid textarea {
//   border: 1px solid red;
//   background-color: #fda498;
// }

// .invalid p {
//   color: #fda498;
//   margin: 5px 0;
// }

export default FormStyles;