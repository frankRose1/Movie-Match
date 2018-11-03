import styled from 'styled-components';

const StyledNav = styled.nav`
  ul {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    list-style: none;
    a, button {
    background: ${props => props.theme.black};
    color: white;
    border-right: 1px solid rgba(255,255,255,0.1);
    text-transform: uppercase;
    padding: 1.2rem 2rem 1rem 2rem;
    display: block;
    border-bottom: 5px solid transparent;
    transition: 0.4s;
    &:hover, .active {
      border-bottom-color: rgba(0,0,0,0.2);
      border-right-color: rgba(0,0,0,0.05);
    }
  }
  button {
    border: none;
    outline: none;
  }
  .user-avatar {
    width: 40px;
    border-radius: 50%;
    vertical-align: middle;
  }
}
`;

export default StyledNav;