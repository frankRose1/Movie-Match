import styled from 'styled-components';

const ReviewsStyles = styled.ul`
  li {
    background: white;
    border: 1px solid ${props => props.theme.lightgrey};
    border-bottom: 0;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
    margin-bottom: 2rem;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    position: relative;
    padding-left: 5px;
    &:before {
      content: '';
      width: 5px;
      display: block;
      position: absolute;
      left: 0;
      height: 100%;
      background: linear-gradient(0, #48ded4 0%, #a026bf 20%, #e82c75 60%, ${props => props.theme.yellow} 85%, #48ded4 95%);
      background-attachment: fixed;
    }
  }

  p {
    white-space:pre-wrap;
  }

  .review-header {
    border-bottom: 1px solid ${props => props.theme.lightgrey};
    display: flex;
    & > * {
      border-right: 1px solid ${props => props.theme.lightgrey};
      padding: 0.2rem;
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: center;
      &:last-child{
        border-right: 0;
      }
    }
    .review-author {
      display: flex;
      justify-content: flex-start;
      img {
        margin-right: 2rem;
      }
    }

    .review-time {
      font-size: 1.4rem;
      color: ${props => props.theme.black};
    }

    .review-stars {
      color: ${props => props.theme.yellow};
      font-size: 3.5rem;
    }

  }

  .review-body {
    padding: 2rem;
  }
`;

export default ReviewsStyles;