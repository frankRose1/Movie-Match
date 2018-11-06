import styled from 'styled-components';

const FormStyles = styled.form`
  margin: 20px auto;
  width: 80%;
  text-align: center;
  box-shadow: 0 2px 3px #ccc;
  border: 1px solid #eee;
  padding: 10px;

  @media (min-width: 600px) {
    max-width: 550px;
  }
  div {
    width: 100%;
    padding: 10px;

    label {
      display: block;
      font-weight: bold;
      margin-bottom: 8px;
    }
    input, select, textarea {
      outline: none;
      border: 1px solid #ccc;
      background-color: #fff;
      font: inherit;
      padding: 6px 10px;
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
  .reset-pw a {
    color: lightblue;
    margin-left: 5px;
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