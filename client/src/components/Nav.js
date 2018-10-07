import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import Logout from '../containers/Logout';

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  list-style: none;
`;

const paths = [
  'cafes',
  'tags',
  'top',
  'add',
  'register',
  'login',
];

const Nav = () => (
  <nav>
    <StyledList>
      {paths.map(path => (
        <li key={path}>
          <NavLink to={`/${path}`}>{path}</NavLink>
        </li>
      ))}
      <Logout />
    </StyledList>
  </nav>
);

export default Nav;