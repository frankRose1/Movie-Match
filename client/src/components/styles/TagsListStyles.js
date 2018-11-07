import styled from 'styled-components';

const TagsListStyles = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;

  .tag-choice{
    margin-right: 1rem;
    margin-bottom: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      position: relative;
      display: none;
      width: auto;
      right: -1.5rem;
      margin-right: -1rem;
      z-index: 2;
      & + label {
        cursor: pointer;
        border-radius: 3px;
        background-color: ${props => props.theme.lightgrey};
        padding: 0.6rem 0.6rem 0.6rem 1.8rem;
        transition: background-color 0.4s ease-in-out;
        &:hover {
          background-color: ${props => props.theme.yellow};
        }
      }
      &:checked + label {
        background-color: ${props => props.theme.yellow};
      }
    }
  }
`;

export default TagsListStyles;