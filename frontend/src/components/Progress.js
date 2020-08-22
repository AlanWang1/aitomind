import React from 'react';
import PropTypes from 'prop-types';

const Progress = ({ percentage }) => {
  return (
    <progress className='progress is-primary' value={`${percentage}%`}>
    
    </progress>
  );
};

Progress.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default Progress;
