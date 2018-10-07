import React from 'react';
import styled from 'styled-components';
import SignIn from '../containers/Auth';
import SignUp from '../containers/SignUp';
import PasswordReset from '../containers/PasswordReset';

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 35px;
`;

const Account = () => {
  return (
    <FormGrid>
      <SignIn />
      <SignUp />
      <PasswordReset />
    </FormGrid>
  );
};

export default Account;