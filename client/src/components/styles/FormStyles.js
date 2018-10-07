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
  button {
    cursor: pointer;
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