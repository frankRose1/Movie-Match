import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;


const ErrorMessage = ({error}) => {
  if (!error) return null;
  //if the error object contains an array(on multiple form validation errors etc), need to map over it
  if (error.message instanceof Array){
    return (
      <ErrorStyles>
        {error.message.map( (err, idx) =>(
          <p key={idx}>
            <strong>Oops!</strong>
            {err}
          </p>
        ))}
      </ErrorStyles>
    )
  }
  return (
    <ErrorStyles>
      <p>
        <strong>Oops!</strong>
        {error.message}
      </p>
    </ErrorStyles>
  );
};

ErrorMessage.defaultProps = {
  error: {}
}

ErrorMessage.propTypes = {
  error: PropTypes.object
};

export default ErrorMessage;