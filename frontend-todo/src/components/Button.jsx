import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`py-1 px-3 w-full rounded transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
};

export default Button;
