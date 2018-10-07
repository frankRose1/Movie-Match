import React from 'react';
import PropTypes from 'prop-types';
import CafeStyles from './styles/CafeStyles';

// Cafe will be passed in as an object

const Cafe = props => {
  const {cafe} = props;
  return (
    <CafeStyles>
      Ima cafe
    </CafeStyles>
  );
};

Cafe.propTypes = {
  cafe: PropTypes.object.isRequired
};

export default Cafe;