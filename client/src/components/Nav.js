import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

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
  'login'
];

const Nav = () => (
  <nav>
    <StyledList>
      {paths.map(path => (
        <li key={path}>
          <NavLink to={`/${path}`}>{path}</NavLink>
        </li>
      ))}
    </StyledList>
  </nav>
);

export default Nav;