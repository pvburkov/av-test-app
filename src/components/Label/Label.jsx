import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withNaming } from '@bem-react/classname';
import './Label.css';

const labelClasses = withNaming({ m: '--' })('label');

const Label = ({
  children,
  className,
  isErrorInfo,
  isHidden,
  htmlFor
}) => (
  <label
    htmlFor={htmlFor}
    className={labelClasses('', {
      error: isErrorInfo,
      hidden: isHidden
    }, [className])}
  >
    {children}    
  </label>
);

export default memo(Label);

Label.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  isErrorInfo: PropTypes.bool,
  isHidden: PropTypes.bool,
  htmlFor: PropTypes.string
};

Label.defaultProps = {
  className: '',
  isErrorInfo: false,
  isHidden: false,
  htmlFor: ''
};
