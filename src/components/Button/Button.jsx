import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withNaming } from '@bem-react/classname';
import './Button.css';

const buttonClasses = withNaming({})('button');

const Button = ({
  className,
  children,
  isDisabled,
  onClick,
  type
}) => (
  <button
    className={buttonClasses('', {}, [className])}
    disabled={isDisabled}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);

export default memo(Button);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string
};

Button.defaultProps = {
  className: '',
  isDisabled: false,
  onClick: () => {},
  type: 'button'
};
