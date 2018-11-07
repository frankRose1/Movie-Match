import styled from 'styled-components';

const StyledCafeCard = styled.li`
  border-radius: 5px;
  background-color: white;
  box-shadow: ${props => props.theme.bs};
  .cafe__hero{
    position: relative;
    padding: 0 10px 0 10px;
    text-align: right;
    &:before{
      display: block;
      content: "";
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      right: 0;
      background:
        linear-gradient(45deg, hsla(190, 95%, 43%, 1) 0%, hsla(190, 95%, 43%, 0) 70%),
        linear-gradient(135deg, hsla(219, 93%, 48%, 1) 10%, hsla(219, 93%, 48%, 0) 80%),
        linear-gradient(225deg, hsla(293, 93%, 48%, 1) 10%, hsla(293, 93%, 48%, 0) 80%),
        linear-gradient(315deg, hsla(130, 96%, 45%, 1) 100%, hsla(130, 96%, 45%, 0) 70%);
      opacity: 0.6;
      z-index: 1;
      clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);
    }
    img {
      height: 100%;
      width: 100%;
      top: 0;
      right: 0;
      position: absolute;
      left: 0;
      object-fit: cover;
      clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);
    }
  }

  .cafe__details{
    padding: 2rem;
    box-shadow: ${props => props.theme.bs}
    p {
      line-height: 1.2;
      margin-bottom: 0;
    }
  }

  .cafe__actions {
    position: relative;
    z-index: 2;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    box-shadow: 0 1px 0 rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.2);
    margin-bottom: 50px;
    padding-top: 10px;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #fff;
  }

  .title{
    word-wrap: break-word;
    position: relative;
    z-index:2;
    font-size: 4rem;
    line-height: 1.1;
    transform: skew(0, -3deg);

    a {
      border-bottom: 0;
      color: ${props => props.theme.yellow};
      opacity: 0.8;
      background-image: linear-gradient(to right, 100%, 50%);
    }
  }
`;

export default StyledCafeCard;