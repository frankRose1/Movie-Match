import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({text, disabledBtn}) =>  (
  <button type="submit" disabled={disabledBtn}>
    {text}
  </button>
);

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  disabledBtn: PropTypes.bool.isRequired
};

export default SubmitButton;