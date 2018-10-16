import styled from 'styled-components';

const SearchStyles = styled.div`
  display: flex;
  input{
    outline: none;
    border: none;
    font-size: 30px;
    flex: 1;
    &:focus{
      background: ${props => props.theme.offWhite};
    }
  }
`;

export default SearchStyles;