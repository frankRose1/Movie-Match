import styled from 'styled-components';

const NotFoundStyles = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  max-width: 550px;
  margin: 100px auto;
  .error{
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .error-code{
    font-size: 130px;
    font-weight: bold;
    margin: 0;
    text-shadow: 5px 5px 8px rgba(0,0,0, 0.4);
  }
  i {
    font-size: 130px;
    color: coral;
  }
  .not-found-message{
    font-size: 25px;
  }
  .not-found-link {
    padding: 8px 10px;
    background-color: ${props => props.theme.yellow};
    color: #fff;
    box-shadow: ${props => props.theme.bs};
    border: 1px solid transparent;
    font-size: 30px;
    border-radius: 5px;
    transition: all 0.4s ease-in-out;
    &:hover{
      background: white;
      border-color: ${props => props.theme.yellow};
      color: ${props => props.theme.yellow};
    }
  }
  @media(max-width: 760px){
    .error{
      flex-direction: column;
    }
  }
`;

export default NotFoundStyles;