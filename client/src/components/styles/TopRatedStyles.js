import styled from 'styled-components'

const TopRatedStyles = styled.table`
  width: 100%;
  td {
    padding: 5px;
  }
  tr:nth-child(even) {
    background-color: white;
  }
  tr:nth-child(odd):not(:first-child){
    background-color: #f7f7f7;
  }
  thead tr {
    background: ${props => props.theme.black};
    color: white;
  }
  a {
    color: ${props => props.theme.black};
  }
`;

export default TopRatedStyles;