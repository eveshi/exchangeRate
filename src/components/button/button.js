import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.css';


const button = props => (
  <button
    className={classes.button}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  children: PropTypes.node.isRequired,
};

button.defaultProps = {
  disabled: null,
};

export default button;
