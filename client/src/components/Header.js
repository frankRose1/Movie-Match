import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './Nav';
import Search from './Search';


const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 150px 1fr 2fr;
  border-bottom: 2px solid rgba(0, 0, 0, 0.08);
  background: ${props => props.theme.black};
`;

const Header = ({isAuth}) => {
  return (
    <StyledHeader>
      <Link to="/">The Grind Logo</Link>
      <Nav isAuth={isAuth}/>
      <Search />
    </StyledHeader>
  );
};

Header.propTypes = {
  isAuth: PropTypes.bool.isRequired
};

export default Header;