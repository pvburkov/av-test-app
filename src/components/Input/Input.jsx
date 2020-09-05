import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withNaming } from '@bem-react/classname';
import './Input.css';

const inputClasses = withNaming({ m: '--' })('input');

const Input = ({
  className,
  id,
  hasError,
  name,
  onChange,
  type,
  value,
  wideMode
}) => (
  <input
    type={type}
    id={id}
    name={name}
    className={inputClasses('', {
      error: hasError,
      wide: wideMode
    }, [className])}
    value={value}
    onChange={onChange}
  />
);

export default memo(Input);

Input.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  hasError: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  wideMode: PropTypes.bool
};

Input.defaultProps = {
  className: '',
  hasError: false,
  type: 'text',
  value: '',
  wideMode: false
};
