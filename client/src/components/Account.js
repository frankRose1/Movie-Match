import React from 'react';
import styled from 'styled-components';
import SignIn from './Auth';
import SignUp from './SignUp';
import PasswordReset from './PasswordReset';

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 35px;
  align-items: center;
`;

const Account = () => {
  return (
    <FormGrid>
      <SignIn />
      <PasswordReset />
      <SignUp />
    </FormGrid>
  );
};

export default Account;