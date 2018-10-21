import styled from 'styled-components';

const NotFoundStyles = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-around;
  p{
    font-size: 3rem;
    font-weight: bold;
  }
  i {
    font-size: 4rem;
    color: coral;
  }
  @media(max-width: 760px){
    flex-direction: column;
  }
`;

export default NotFoundStyles;