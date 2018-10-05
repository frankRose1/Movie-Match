import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Aux from '../hoc/Auxilliary';

const Layout = props => (
  <Aux>
    <Header /> 
    <main>
      {props.children}
    </main>
    <Footer />
  </Aux>
);

export default Layout;