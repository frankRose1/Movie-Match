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
}
.review-header {
    .review-author {
      img {

      }
    }
  }


`;

export default ReviewsStyles;