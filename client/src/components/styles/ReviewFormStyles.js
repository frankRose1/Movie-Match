import styled from 'styled-components';

const ReviewFormStyles = styled.form`
  position: relative;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
  textarea {
    border: 0;
    outline: 0;
    font-size: 2rem;
    padding: 2rem;
    height: 200px;
    border: 1px solid ${props => props.theme.lightgrey};
    width: 100%;
  }
  .reviewer-meta {
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid ${props => props.theme.lightgrey};
    & > * {
      flex: 1;
    }
  }

  .reviewer-stars {
    display: flex;
    justify-content: center;
    input {
      display: none;
      &:checked {
        & ~ label {
          color: ${props => props.theme.yellow};
        }
      }
      & + label {
        cursor: pointer;
        font-size: 0;
        &:before {
          content: '★';
          font-size: 2rem;
        }
        &[for="star5"] { order: 5; }
        &[for="star4"] { order: 4; }
        &[for="star3"] { order: 3; }
        &[for="star2"] { order: 2; }
        &[for="star1"] { order: 1; }
        &:hover, &:hover ~ label {
          color: ${props => props.theme.yellow};
        }
      }
    }
  }
  button[type="submit"]{
    border: 0;
    outline: none;
    background:${props => props.theme.yellow};
    color: ${props => props.theme.black};
    font-family: inherit;
    font-size: 1.4rem;
    padding: 8px 12px;
    border-radius: 3px;
    font-weight: 600;
  }
`;

export default ReviewFormStyles;