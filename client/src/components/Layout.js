import React from 'react';
import styled, {ThemeProvider, injectGlobal} from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Aux from '../hoc/Auxilliary';

const theme = {
  yellow: '#ffd454',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1100px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
  color: ${props => props.theme.black};
`;


injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
  html{
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'Roboto', sans-serif;
  }
  ul {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: #fff;
  }
`;


const Layout = props => (
  <ThemeProvider theme={theme}>
    <Aux>
      <Header /> 
      <main>
        <Inner>{props.children}</Inner>
      </main>
      <Footer />
    </Aux>
  </ThemeProvider>
);

export default Layout;