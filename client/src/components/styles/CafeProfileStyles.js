import styled from 'styled-components';

const CafeProfileStyles = styled.div`
  .hero {
    height: 500px;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2vw), 0% 100%);
    &:before {
      display: block;
      content: '';
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
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2vw), 0% 100%);
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
    }
  }
  .details {
    background: white;
    position: relative;
    padding: 3rem;
    margin-top: -10rem;
    box-shadow: 0 0 10px 2px rgba(0,0,0,0.15);
    img.map{
      width: calc(100% + 6rem);
      max-width: none;
      margin-top: -3rem;
      margin-left: -3rem;
    }
    p.location{
      margin: 0;
      margin-top: -3rem;
      margin-right: -5rem;
      background: ${props => props.theme.black};
      color: white;
      display: inline-block;
      float: right;
      position: relative;
      padding: 1rem;
    }
  }
`;

export default CafeProfileStyles;