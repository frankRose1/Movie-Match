import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  padding: 80px;
  background-color: ${props => props.theme.black};
`;

const Footer = () => (
  <StyledFooter>
    <a href="/facebook">Social</a>
    <a href="/instagram">Media</a>
    <a href="/twitter">Links</a>
  </StyledFooter>
);

export default Footer;